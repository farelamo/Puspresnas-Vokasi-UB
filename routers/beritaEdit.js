let express = require('express')
let beritaEdit = express.Router()
let controller = require('../app/controller/beritaEdit')

beritaEdit.route('/beritaEdit/:id_berita')
    .get(controller.index)
    .post(controller.crud)

module.exports = beritaEdit