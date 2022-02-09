let express = require('express')
let dashboard = express.Router()
let controller = require('../app/controller/dashboard')

dashboard.route('/dashboard')
    .get(controller.index)

module.exports = dashboard