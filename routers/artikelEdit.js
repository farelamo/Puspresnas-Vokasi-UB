const express = require('express')
const artikelEdit = express.Router()
const controller = require('../controller/artikelEdit')

artikelEdit.route('/artikelEdit/:id_artikel')
    .get(controller.index)
    .post(controller.crud)

module.exports = artikelEdit