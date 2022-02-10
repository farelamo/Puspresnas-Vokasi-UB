var express = require('express')
var beritaAPI = express.Router()
var controller = require('../controllerAPI/beritaAPI')

beritaAPI.get('/api/berita', controller.findAll)
beritaAPI.get('/api/berita/:id', controller.findOne)

module.exports = beritaAPI