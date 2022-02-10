var express = require('express')
var jenisLombaAPI = express.Router()
var controller = require('../controllerAPI/jenisLombaAPI')

jenisLombaAPI.get('/api/jenisLomba', controller.findAll)
jenisLombaAPI.get('/api/jenisLomba/:id', controller.findOne)

module.exports = jenisLombaAPI