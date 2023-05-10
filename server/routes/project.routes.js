const express = require('express')

const { multerImage } = require('../config/multer.config')
const { projectCreate, projectDeleteOne } = require('../controllers/project.controller')
const verifyToken = require('../middleware/VerifyToken')

const projectRouter = express.Router()

projectRouter.post('/api/project/create', verifyToken, multerImage, projectCreate)
projectRouter.delete('/api/project/:id', verifyToken, projectDeleteOne)

module.exports = projectRouter