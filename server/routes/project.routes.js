const express = require('express')

const { multerImage } = require('../config/multer.config')
const { projectCreate, projectDeleteOne } = require('../controllers/project.controller')

const projectRouter = express.Router()

projectRouter.post('/api/project/create', multerImage, projectCreate)
projectRouter.delete('/api/project/:id', projectDeleteOne)

module.exports = projectRouter