const express = require('express')
const multer = require('multer')

const { storage, imageFilter } = require('../config/multer.config')
const { educationCreate, educationDeleteOne } = require('../controllers/education.controller')

const educationRouter = express.Router()

const multerFields = [
  { name: 'logo', maxCount: 1 },
  { name: 'certificate', maxCount: 1 }
]

educationRouter.post(
  '/api/education/create',
  multer({ storage, fileFilter: imageFilter }).fields(multerFields),
  educationCreate
)
educationRouter.delete('/api/education/:id', educationDeleteOne)

module.exports = educationRouter