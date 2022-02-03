var express = require('express')
var mahasiswaNew = express.Router()
var controller = require('../app/controller/mahasiswaNew')

mahasiswaNew.route('/mahasiswaNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = mahasiswaNew