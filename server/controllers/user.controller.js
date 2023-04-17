const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

const { s3Upload } = require('../config/aws.config')
const User = require('../models/User')

const userSignup = async (req, res, next) => {
  const { email, password, firstName, lastName, directory } = req.body

  if (!(email && password && firstName && lastName))
    return res.status(400).json({ type: 'error', msg: 'Missing required parameters.'})

  try {
    const hashedPassword = bcrypt.hashSync(password, 10)

    const imageURL = req.file
      ? await s3Upload(`${firstName}_${lastName}` + path.extname(req.file.originalname), req.file.path, directory)
      : undefined // If no image exists - Set to "undefined" so column doesn't appear in database.

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      imageURL
    })

    newUser.save()
    return res.status(200).json({ type: 'success', msg: `${firstName} has been signed up!`})
  } catch (error) {
    console.error(error)
    return res.status(401).json({ type: 'error', msg: 'Could not sign up the user.' })
  }
}

const userSignin = async (req, res) => {
  const { email, password } = req.body

  if (!(email && password))
    return res.status(400).json({ type: 'error', msg: 'Missing required parameters.'})

  try {
    const user = await User.findOne({ email })
    
    const passwordsMatch = bcrypt.compareSync(password, user.password)
    if (!passwordsMatch) throw new Error('Cannot find a user that matches email and password.')

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
    return res.status(401).json({ type: 'error', msg: 'User sign-in credentials were either incorrect or do not exist.' })
  }
}

const userSignout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) return res.sendStatus(204)

  try {
    const user = await User.findOne({ refreshToken })
    if (!user) throw new Error('There was a problem while trying to sign the user out.')

    user.refreshToken = undefined
    res.clearCookie('refreshToken')
    await user.save()
    return res.status(200).json({ type: 'success', msg: 'You have been signed out.' })
  } catch (error) {
    console.error(error)
    return res.status(401).json({ type: 'error', msg: 'There was a problem while trying to sign the user out.' })
  }
}

module.exports = { userSignup, userSignin, userSignout } 