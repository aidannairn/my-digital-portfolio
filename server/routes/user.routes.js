const express = require('express')

const { userSignup, userSignin } = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.post('/signup', userSignup)
userRouter.post('/signin', userSignin)
userRouter.delete('/signout', () => {})

module.exports = userRouter