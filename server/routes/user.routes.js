const express = require('express')

const { multerImage } = require('../config/multer.config')
const { userSignup, userSignin, userSignout } = require('../controllers/user.controller')

const userRouter = express.Router()

// userRouter.post('/signup', multerImage, userSignup)
userRouter.post('/signin', userSignin)
userRouter.delete('/signout', userSignout)

module.exports = userRouter