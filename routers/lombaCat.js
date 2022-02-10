var express = require('express')
var lombaCat = express.Router()
var controller = require('../app/controller/lombaCat')

lombaCat.route('/lombaCat')
    .get(controller.index)
    .post(controller.kondisi)

module.exports = lombaCat