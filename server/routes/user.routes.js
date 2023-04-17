const express = require('express')

const { multerImage } = require('../config/multer.config')
const { userSignup, userSignin, userSignout } = require('../controllers/user.controller')

const userRouter = express.Router()

// userRouter.post('/signup', multerImage, userSignup)
userRouter.post('/api/signin', userSignin)
userRouter.delete('/api/signout', userSignout)

module.exports = userRouter