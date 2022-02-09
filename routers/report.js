let express = require('express')
let report = express.Router()
let controller = require('../app/controller/report')

report.route('/report')
    .get(controller.index)

module.exports = report