const express = require('express')
const lombaCat = express.Router()
const controller = require('../app/controller/lombaTag')

lombaCat.route('/lombaTag')
    .get(controller.index)
    .post(controller.kondisi)

module.exports = lombaCat