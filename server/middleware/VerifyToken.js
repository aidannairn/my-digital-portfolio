const jwt = require('jsonwebtoken')

class CustomError extends Error {
  constructor(statusCode, message) {
   super(message)
   this.statusCode = statusCode
  }
}

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = await req.headers['authorization']
    const token = await authHeader?.split(' ')[1]

    if (!token)
      throw new CustomError (401, 'Could not find a user token.')

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

    if (!decoded)
      throw new CustomError (403, 'Could not verify the user.')
      
    req.userId = decoded.userId
    next()
  } catch (error) {
    console.error(error)
    res.status(error.statusCode || 400).json({ type: 'error', msg: 'Could not verify the user is authenticated.' })
  }
}

module.exports = verifyToken