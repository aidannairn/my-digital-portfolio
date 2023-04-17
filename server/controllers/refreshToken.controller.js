const jwt = require('jsonwebtoken')

const User = require('../models/User')

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) throw new Error('No refresh token exists.')
    
    const user = await User.findOne({ refreshToken })
    if (!user) throw new Error('No user with refresh token exists.')

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    if (!decoded) throw new Error('Could not decode refresh token.')

    const { _id: id, email, firstName, lastName, imageURL } = user
    const userData = { id, email, firstName, lastName, imageURL }

    const accessToken = jwt.sign(
      userData,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    )
    res.json({ accessToken })
  } catch (error) {
    console.error(error)
    return res.status(403).json({ type: 'error', msg: 'Could not use refresh token.' })
  }
}

module.exports = refreshToken