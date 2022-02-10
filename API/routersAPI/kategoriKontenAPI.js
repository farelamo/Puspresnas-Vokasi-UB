var express = require('express')
var kategoriKontenAPI = express.Router()
var controller = require('../controllerAPI/kategoriKontenAPI')

kategoriKontenAPI.get('/api/kategoriKonten', controller.findAll)
kategoriKontenAPI.get('/api/kategoriKonten/:id', controller.findOne)

module.exports = kategoriKontenAPI