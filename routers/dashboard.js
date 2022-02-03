var express = require('express')
var dashboard = express.Router()
var controller = require('../app/controller/dashboard')

dashboard.route('/dashboard')
    .get(controller.index)

module.exports = dashboard