let express = require('express')
let kategoriKontenAPI = express.Router()
let controller = require('../controllerAPI/kategoriKontenAPI')

kategoriKontenAPI.get('/api/kategoriKonten', controller.findAll)
kategoriKontenAPI.get('/api/kategoriKonten/:id', controller.findOne)

module.exports = kategoriKontenAPI