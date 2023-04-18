const express = require('express')

const { multerImage } = require('../config/multer.config')
const { educationCreate, educationDeleteOne } = require('../controllers/education.controller')

const educationRouter = express.Router()

educationRouter.post('/api/education/create', multerImage, educationCreate)
educationRouter.delete('/api/education/:id', educationDeleteOne)

module.exports = educationRouter