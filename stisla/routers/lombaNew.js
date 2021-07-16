const express = require('express')
const lombaNew = express.Router()
const controller = require('../controller/lombaNew')

lombaNew.route('/lombaNew')
    .get(controller.index)

module.exports = lombaNew