const express = require('express')

const { multerImage } = require('../config/multer.config')
const { webDemoCreate, webDemoDeleteOne } = require('../controllers/about-website.controller')
const verifyToken = require('../middleware/VerifyToken')

const aboutWebsiteRouter = express.Router()

aboutWebsiteRouter.post('/about_website/create', verifyToken, multerImage, webDemoCreate)
aboutWebsiteRouter.delete('/about_website/:id', verifyToken, webDemoDeleteOne)

module.exports = aboutWebsiteRouter