const express = require('express')
const jenisLombaAPI = express.Router()
const controller = require('../controllerAPI/jenisLombaAPI')

jenisLombaAPI.get('/api/jenisLomba', controller.findAll)
jenisLombaAPI.get('/api/jenisLomba/:id', controller.findOne)

module.exports = jenisLombaAPI