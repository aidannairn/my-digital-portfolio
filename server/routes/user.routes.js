const express = require('express')

const { multerImage } = require('../config/multer.config')
const { getUserContent, userSignup, userSignin, userSignout } = require('../controllers/user.controller')
const refreshToken = require('../controllers/refreshToken.controller')

const userRouter = express.Router()

// userRouter.post('/signup', multerImage, userSignup)
userRouter.post('/api/signin', userSignin)
userRouter.delete('/api/signout', userSignout)
userRouter.get('/api/token', refreshToken)
userRouter.get('/api/user_content/:id', getUserContent)

module.exports = userRouter