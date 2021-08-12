const express = require('express')
const bidangLombaAPI = express.Router()
const controller = require('../controllerAPI/bidangLombaAPI')

bidangLombaAPI.get('/api/bidangLomba', controller.findAll)
bidangLombaAPI.get('/api/bidangLomba/:id', controller.findOne)

module.exports = bidangLombaAPI