const express = require('express')

const { multerImage } = require('../config/multer.config')
const { techCreate, techDeleteOne } = require('../controllers/technology.controller')

const technologyRouter = express.Router()

technologyRouter.post('/api/tech/create', multerImage, techCreate)
// technologyRouter.delete('/api/tech/:id', techDeleteOne)

module.exports = technologyRouter