const express = require('express')
const jenisLomba = express.Router()
const controller = require('../controller/jenisLomba')

jenisLomba.route('/jenisLomba')
    .get(controller.index)
    .post(controller.tambah)
    // .post(controller.post)

module.exports = jenisLomba