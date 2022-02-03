var express = require('express')
var bidangLombaAPI = express.Router()
var controller = require('../controllerAPI/bidangLombaAPI')

bidangLombaAPI.get('/api/bidangLomba', controller.findAll)
bidangLombaAPI.get('/api/bidangLomba/:id', controller.findOne)

module.exports = bidangLombaAPI