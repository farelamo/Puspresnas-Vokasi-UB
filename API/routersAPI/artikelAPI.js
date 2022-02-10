var express = require('express')
var artikelAPI = express.Router()
var controller = require('../controllerAPI/artikelAPI')

artikelAPI.get('/api/artikel', controller.findAll)
artikelAPI.get('/api/artikel/:id', controller.findOne)

module.exports = artikelAPI