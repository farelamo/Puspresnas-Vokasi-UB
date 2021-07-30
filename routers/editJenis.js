const express = require('express')
const jenisLomba = express.Router()
const controller = require('../controller/editJenis')
    
jenisLomba.route('/editJenis/:id')
    .get(controller.index)
    .post(controller.edit)

module.exports = jenisLomba