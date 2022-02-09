let express = require('express')
let kategoriLombaAPI = express.Router()
let controller = require('../controllerAPI/kategoriLombaAPI')

kategoriLombaAPI.get('/api/kategoriLomba', controller.findAll)
kategoriLombaAPI.get('/api/kategoriLomba/:id', controller.findOne)

module.exports = kategoriLombaAPI