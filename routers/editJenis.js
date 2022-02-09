let express = require('express')
let jenisLomba = express.Router()
let controller = require('../app/controller/editJenis')
    
jenisLomba.route('/editJenis/:id')
    .get(controller.index)
    .post(controller.edit)

module.exports = jenisLomba