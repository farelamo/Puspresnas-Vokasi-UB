var express = require('express')
var lombaAll = express.Router()
var controller = require('../app/controller/lombaAll')

lombaAll.route('/lombaAll')
    .get(controller.index)
    .post(controller.crud)

module.exports = lombaAll