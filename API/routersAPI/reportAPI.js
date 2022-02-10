var express = require('express')
var reportAPI = express.Router()
var controller = require('../controllerAPI/reportAPI')

reportAPI.post('/api/report', controller.countData)

module.exports = reportAPI