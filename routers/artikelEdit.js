let express = require('express')
let artikelEdit = express.Router()
let controller = require('../app/controller/artikelEdit')

artikelEdit.route('/artikelEdit/:id_artikel')
    .get(controller.index)
    .post(controller.crud)

module.exports = artikelEdit