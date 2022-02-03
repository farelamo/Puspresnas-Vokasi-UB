var express = require('express')
var mahasiswaEdit = express.Router()
var controller = require('../app/controller/mahasiswaEdit')

mahasiswaEdit.route('/mahasiswaEdit/:id')
    .get(controller.index)
    .post(controller.crud)

module.exports = mahasiswaEdit