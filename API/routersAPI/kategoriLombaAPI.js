const express = require('express')
const kategoriLombaAPI = express.Router()
const controller = require('../controllerAPI/kategoriLombaAPI')

kategoriLombaAPI.get('/api/kategoriLomba', controller.findAll)
kategoriLombaAPI.get('/api/kategoriLomba/:id', controller.findOne)

module.exports = kategoriLombaAPI