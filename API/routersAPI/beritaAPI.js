const express = require('express')
const beritaAPI = express.Router()
const controller = require('../controllerAPI/beritaAPI')

beritaAPI.get('/api/berita', controller.findAll)
beritaAPI.get('/api/berita/:id', controller.findOne)

module.exports = beritaAPI