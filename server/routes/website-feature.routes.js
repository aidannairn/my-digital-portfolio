const express = require('express')

const { multerImage } = require('../config/multer.config')
const { getWebsiteFeatures, websiteFeatureCreate, websiteFeatureDeleteOne } = require('../controllers/website-feature.controller')
const verifyToken = require('../middleware/VerifyToken')

const websiteFeatureRouter = express.Router()

websiteFeatureRouter.get('/website_features', getWebsiteFeatures)
websiteFeatureRouter.post('/website_feature/create', verifyToken, multerImage, websiteFeatureCreate)
websiteFeatureRouter.delete('/website_feature/:websiteFeatureId', verifyToken, websiteFeatureDeleteOne)

module.exports = websiteFeatureRouter