var express = require('express')
var beritaEdit = express.Router()
var controller = require('../app/controller/beritaEdit')

beritaEdit.route('/beritaEdit/:id_berita')
    .get(controller.index)
    .post(controller.crud)

module.exports = beritaEdit