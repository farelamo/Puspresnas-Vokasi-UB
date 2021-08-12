const express = require('express')
const artikelAPI = express.Router()
const controller = require('../controllerAPI/artikelAPI')

artikelAPI.get('/api/artikel', controller.findAll)
artikelAPI.get('/api/artikel/:id', controller.findOne)

module.exports = artikelAPI