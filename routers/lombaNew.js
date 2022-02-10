var express = require('express')
var lombaNew = express.Router()
var controller = require('../app/controller/lombaNew')

lombaNew.route('/lombaNew')
    .get(controller.index)

module.exports = lombaNew