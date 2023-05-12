const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

const { s3Upload } = require('../config/aws.config')
const User = require('../models/User')
const Experience = require('../models/Education')
const Technology = require('../models/Technology')
const Project = require('../models/Project')
const StatusCodeError = require('../utils/statusCodeError')

const getUserContent = async (req, res) => {
  const { id: userId } = req.params

  try {
    if (!userId) throw new StatusCodeError(400, 'No user ID was specified for data retrieval.')

    const excludedFields = ['-__v', '-createdAt', '-updatedAt']
    const experiences = await Experience
      .find({ userId })
      .select(excludedFields)
    const technologies = await Technology
      .find({ userId })
      .select(excludedFields)
    const projects = await Project
      .find({ userId })
      .select(excludedFields)

    const data = { experiences, technologies, projects }
    return res.status(200).send(data)
  } catch (error) {
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: { 
        type: 'error',
        msg: 'There was a problem retrieving some data for the page.'
      }
    })
  }
}

const userSignup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body
  
  try {
    if (!(email && password && firstName && lastName))
      throw new StatusCodeError(400, 'Missing required parameters.')

    const hashedPassword = bcrypt.hashSync(password, 10)

    /*  Prepare the image URL:
        - Use var so that imageURL can be hoisted into the catch block.
        - If there is an error while saving the project to the database, that image should be removed from the S3 bucket.
        - If no image file exists - Set to "undefined" so column doesn't appear in database.
    */
    var imageURL = req.file
      ? await s3Upload(`${firstName}_${lastName}` + path.extname(req.file.originalname), req.file.path, 'users')
      : undefined

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      imageURL
    })

    await user.save()
    return res.status(200).json({
      alert: {
        type: 'success',
        msg: 'You have been signed up!'
      }
    })
  } catch (error) {
    if (imageURL) s3Delete(imageURL)
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: 'There was a problem while trying to sign you up.'
      }
    })
  }
}

const userSignin = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!(email && password))
      throw new StatusCodeError(400, 'Missing required parameters.')

    const user = await User.findOne({ email })
    
    const passwordsMatch = bcrypt.compareSync(password, user.password)
    if (!passwordsMatch) throw new StatusCodeError(401, 'Cannot find a user with those credentials.')

    const { _id: id, firstName, lastName, imageURL } = user
    const userData = { id, firstName, lastName, imageURL }

    const accessToken = jwt.sign(
      userData,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    )
    
    const refreshToken = jwt.sign(
      userData,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    user.refreshToken = refreshToken

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // One day
    })

    await user.save()
    res.status(200).json({ accessToken })
  } catch (error) {
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: { 
        type: 'error',
        msg: 'User sign-in credentials were either incorrect or do not exist.'
      }
    })
  }
}

const userSignout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  try {
    if (!refreshToken) throw new StatusCodeError(204, 'An active user token could not be retrieved.')

    const user = await User.findOne({ refreshToken })
    if (!user) throw new StatusCodeError(
      404, 'No active user could be found to initiate sign out.'
    )

    user.refreshToken = undefined
    res.clearCookie('refreshToken')
    await user.save()
    return res.status(200).json({
      alert: {
        type: 'success',
        msg: 'You have been signed out.'
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: error?.msg || 'There was a problem while trying to sign the user out.'
      }
    })
  }
}

module.exports = { getUserContent, userSignup, userSignin, userSignout } 