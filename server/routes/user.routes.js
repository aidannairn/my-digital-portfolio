const express = require('express')

const { multerImage } = require('../config/multer.config')
const { getUserContent, userSignup, userSignin, userSignout } = require('../controllers/user.controller')
const refreshToken = require('../controllers/refreshToken.controller')

const userRouter = express.Router()

// userRouter.post('/signup', multerImage, userSignup)
userRouter.post('/signin', userSignin)
userRouter.delete('/signout', userSignout)
userRouter.get('/token', refreshToken)
userRouter.get('/user_content/:id', getUserContent)

module.exports = userRouter