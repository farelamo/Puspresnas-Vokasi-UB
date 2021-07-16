const express = require('express')
const dashboard = express.Router()
const controller = require('../controller/dashboard')

dashboard.route('/dashboard')
    .get(controller.index)

module.exports = dashboard