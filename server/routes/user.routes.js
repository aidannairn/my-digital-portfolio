const express = require('express')

const { userSignup } = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.post('/signup', userSignup)
userRouter.get('/signin', () => {})
userRouter.delete('/signout', () => {})

module.exports = userRouter