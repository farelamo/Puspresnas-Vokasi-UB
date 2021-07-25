const express = require('express')
const jenisLomba = express.Router()
const controller = require('../controller/jenisLomba')

jenisLomba.route('/jenisLomba')
    .get(controller.index)
    .post(controller.tambah)
    // .post(controller.post)

jenisLomba.get('/api/jenisLomba', controller.findAll)
jenisLomba.get('/api/jenisLomba/:id', controller.findOne)

module.exports = jenisLomba