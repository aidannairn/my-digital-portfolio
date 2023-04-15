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

module.exports = { userSignup } 