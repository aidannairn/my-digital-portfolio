const express = require('express')

const { multerImage } = require('../config/multer.config')
const { userSignup, userSignin, userSignout } = require('../controllers/user.controller')
const refreshToken = require('../controllers/refreshToken.controller')

const userRouter = express.Router()

// userRouter.post('/signup', multerImage, userSignup)
userRouter.post('/api/signin', userSignin)
userRouter.delete('/api/signout', userSignout)
userRouter.get('/api/token', refreshToken)

module.exports = userRouter