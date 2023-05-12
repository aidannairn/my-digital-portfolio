const jwt = require('jsonwebtoken')
const StatusCodeError = require('../utils/statusCodeError')

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req.headers['authorization']
    const token = await authHeader?.split(' ')[1]

    if (!token)
      throw new StatusCodeError (401, 'Could not find a user token.')

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

    if (!decoded)
      throw new StatusCodeError (403, 'Could not verify the user is authenticated.')
      
    req.userId = decoded.userId
    next()
  } catch (error) {
    console.error(error)
    res.status(error?.statusCode || 400).json({
      alert: {
        type: 'error',
        msg: 'Could not verify the user is authorised to perform this request.'
      }
    })
  }
}

module.exports = verifyToken