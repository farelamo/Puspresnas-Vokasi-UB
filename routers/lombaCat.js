const express = require('express')
const lombaCat = express.Router()
const controller = require('../app/controller/lombaCat')

lombaCat.route('/lombaCat')
    .get(controller.index)
    .post(controller.kondisi)

module.exports = lombaCat