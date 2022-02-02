const express = require('express')
const lombaAll = express.Router()
const controller = require('../app/controller/lombaAll')

lombaAll.route('/lombaAll')
    .get(controller.index)
    .post(controller.crud)

module.exports = lombaAll