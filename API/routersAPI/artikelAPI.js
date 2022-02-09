let express = require('express')
let artikelAPI = express.Router()
let controller = require('../controllerAPI/artikelAPI')

artikelAPI.get('/api/artikel', controller.findAll)
artikelAPI.get('/api/artikel/:id', controller.findOne)

module.exports = artikelAPI