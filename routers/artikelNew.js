var express = require('express')
var artikelNew = express.Router()
var controller = require('../app/controller/artikelNew')

artikelNew.route('/artikelNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = artikelNew