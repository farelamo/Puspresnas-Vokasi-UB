const express = require('express')
const lombaAll = express.Router()
const controller = require('../controller/lombaAll')

lombaAll.route('/lombaAll')
    .get(controller.index)

module.exports = lombaAll