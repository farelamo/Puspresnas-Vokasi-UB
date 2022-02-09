let express = require('express')
let jenisLombaAPI = express.Router()
let controller = require('../controllerAPI/jenisLombaAPI')

jenisLombaAPI.get('/api/jenisLomba', controller.findAll)
jenisLombaAPI.get('/api/jenisLomba/:id', controller.findOne)

module.exports = jenisLombaAPI