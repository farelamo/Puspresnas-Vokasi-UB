let express = require('express')
let bidangLombaAPI = express.Router()
let controller = require('../controllerAPI/bidangLombaAPI')

bidangLombaAPI.get('/api/bidangLomba', controller.findAll)
bidangLombaAPI.get('/api/bidangLomba/:id', controller.findOne)

module.exports = bidangLombaAPI