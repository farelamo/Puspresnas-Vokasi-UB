const express = require('express')
const jenisLomba = express.Router()
const controller = require('../app/controller/jenisLomba')

jenisLomba.route('/jenisLomba')
    .get(controller.index)
    .post(controller.tambah)

module.exports = jenisLomba