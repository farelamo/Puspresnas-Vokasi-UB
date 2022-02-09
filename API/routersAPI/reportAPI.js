let express = require('express')
let reportAPI = express.Router()
let controller = require('../controllerAPI/reportAPI')

reportAPI.post('/api/report', controller.countData)

module.exports = reportAPI