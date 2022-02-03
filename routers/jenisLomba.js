var express = require('express')
var jenisLomba = express.Router()
var controller = require('../app/controller/jenisLomba')

jenisLomba.route('/jenisLomba')
    .get(controller.index)
    .post(controller.tambah)

module.exports = jenisLomba