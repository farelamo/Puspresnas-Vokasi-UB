var express = require('express')
var tagLombaAPI = express.Router()
var controller = require('../controllerAPI/tagLombaAPI')

tagLombaAPI.get('/api/tagLomba', controller.findAll)
tagLombaAPI.get('/api/tagLomba/:id', controller.findOne)

module.exports = tagLombaAPI