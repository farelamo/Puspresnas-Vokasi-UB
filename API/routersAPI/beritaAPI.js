let express = require('express')
let beritaAPI = express.Router()
let controller = require('../controllerAPI/beritaAPI')

beritaAPI.get('/api/berita', controller.findAll)
beritaAPI.get('/api/berita/:id', controller.findOne)

module.exports = beritaAPI