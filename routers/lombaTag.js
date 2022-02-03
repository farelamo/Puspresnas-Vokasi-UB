var express = require('express')
var lombaCat = express.Router()
var controller = require('../app/controller/lombaTag')

lombaCat.route('/lombaTag')
    .get(controller.index)
    .post(controller.kondisi)

module.exports = lombaCat