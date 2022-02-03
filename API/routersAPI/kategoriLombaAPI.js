var express = require('express')
var kategoriLombaAPI = express.Router()
var controller = require('../controllerAPI/kategoriLombaAPI')

kategoriLombaAPI.get('/api/kategoriLomba', controller.findAll)
kategoriLombaAPI.get('/api/kategoriLomba/:id', controller.findOne)

module.exports = kategoriLombaAPI