const express = require('express')
const lombaCat = express.Router()
const controller = require('../controller/lombaTag')

lombaCat.route('/lombaTag')
    .get(controller.index)
    .post(controller.kondisi)

module.exports = lombaCat