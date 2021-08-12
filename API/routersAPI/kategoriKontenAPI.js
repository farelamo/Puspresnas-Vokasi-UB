const express = require('express')
const kategoriKontenAPI = express.Router()
const controller = require('../controllerAPI/kategoriKontenAPI')

kategoriKontenAPI.get('/api/kategoriKonten', controller.findAll)
kategoriKontenAPI.get('/api/kategoriKonten/:id', controller.findOne)

module.exports = kategoriKontenAPI