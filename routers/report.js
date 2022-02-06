var express = require('express')
var report = express.Router()
var controller = require('../app/controller/report')

report.route('/report')
    .get(controller.index)

module.exports = report