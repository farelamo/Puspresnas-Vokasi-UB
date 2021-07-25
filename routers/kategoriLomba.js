const express = require('express')
const kategoriLomba = express.Router()
const controller = require('../controller/kategoriLomba')

kategoriLomba.get('/api/kategoriLomba', controller.findAll)
kategoriLomba.get('/api/kategoriLomba/:id', controller.findOne)

module.exports = kategoriLomba