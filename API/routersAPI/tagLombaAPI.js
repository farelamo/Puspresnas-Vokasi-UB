const express = require('express')
const tagLombaAPI = express.Router()
const controller = require('../controllerAPI/tagLombaAPI')

tagLombaAPI.get('/api/tagLomba', controller.findAll)
tagLombaAPI.get('/api/tagLomba/:id', controller.findOne)

module.exports = tagLombaAPI