const express = require('express')
const kategoriKonten = express.Router()
const controller = require('../controller/kategoriKonten')

kategoriKonten.get('/api/kategoriKonten', controller.findAll)
kategoriKonten.get('/api/kategoriKonten/:id', controller.findOne)

module.exports = kategoriKonten