let express = require('express')
let jenisLomba = express.Router()
let controller = require('../app/controller/jenisLomba')

jenisLomba.route('/jenisLomba')
    .get(controller.index)
    .post(controller.tambah)

module.exports = jenisLomba