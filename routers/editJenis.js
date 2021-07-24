const express = require('express')
const jenisLomba = express.Router()
const controller = require('../controller/editJenis')

jenisLomba.route('/editJenis')
    .post(controller.edit)

module.exports = jenisLomba