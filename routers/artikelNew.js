const express = require('express')
const artikelNew = express.Router()
const controller = require('../controller/artikelNew')

artikelNew.route('/artikelNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = artikelNew