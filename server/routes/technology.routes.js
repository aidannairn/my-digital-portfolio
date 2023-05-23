const express = require('express')

const { multerImage } = require('../config/multer.config')
const { techCreate, techDeleteOne } = require('../controllers/technology.controller')
const verifyToken = require('../middleware/VerifyToken')

const technologyRouter = express.Router()

technologyRouter.post('/tech/create', verifyToken, multerImage, techCreate)
technologyRouter.delete('/tech/:id', verifyToken, techDeleteOne)

module.exports = technologyRouter