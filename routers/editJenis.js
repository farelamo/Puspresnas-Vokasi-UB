var express = require('express')
var jenisLomba = express.Router()
var controller = require('../app/controller/editJenis')
    
jenisLomba.route('/editJenis/:id')
    .get(controller.index)
    .post(controller.edit)

module.exports = jenisLomba