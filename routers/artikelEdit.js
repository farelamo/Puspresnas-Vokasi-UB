var express = require('express')
var artikelEdit = express.Router()
var controller = require('../app/controller/artikelEdit')

artikelEdit.route('/artikelEdit/:id_artikel')
    .get(controller.index)
    .post(controller.crud)

module.exports = artikelEdit