let express = require('express')
let lombaCat = express.Router()
let controller = require('../app/controller/lombaTag')

lombaCat.route('/lombaTag')
    .get(controller.index)
    .post(controller.kondisi)

module.exports = lombaCat