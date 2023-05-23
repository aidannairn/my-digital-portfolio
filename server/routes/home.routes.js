const express = require('express')

const { getHomeAssets } = require('../controllers/home.controller')

const homeRouter = express.Router()

homeRouter.get('/home', getHomeAssets)

module.exports = homeRouter