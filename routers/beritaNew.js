var express = require('express')
var beritaNew = express.Router()
var controller = require('../app/controller/beritaNew')

beritaNew.route('/beritaNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = beritaNew