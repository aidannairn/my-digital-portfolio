const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const User = require('../models/User')

const userSignup = (req, res) => {
  const { email, password, firstName, lastName, imageURL } = req.body

  if (!(email && password && firstName && lastName))
    return res.status(400).json({ type: 'error', msg: 'Missing required parameters.'})

  try {
    const hashedPassword = bcrypt.hashSync(password, 10)

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
    
    if (bcrypt.compareSync(password, user.password)) {
      const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '1d' }
      )

      user.refreshToken = refreshToken

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // One day
      })

      await user.save()
      res.status(200).json({ type: 'success', msg: `Hello, ${user.firstName}!` })
    } else {
      throw new Error()
    }
  } catch (error) {
    console.error(error)
    return res.status(401).json({ type: 'error', msg: 'User sign-in credentials were either incorrect or do not exist.' })
  }
}

module.exports = { userSignup, userSignin } 