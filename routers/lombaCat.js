let express = require('express')
let lombaCat = express.Router()
let controller = require('../app/controller/lombaCat')

lombaCat.route('/lombaCat')
    .get(controller.index)
    .post(controller.kondisi)

module.exports = lombaCat