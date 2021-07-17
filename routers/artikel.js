const express = require('express')
const artikel = express.Router()
const controller = require('../controller/artikel')

artikel.route('/artikel')
    .get(controller.index)
    .post(controller.crud)

module.exports = artikel