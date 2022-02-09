let express = require('express')
let artikelNew = express.Router()
let controller = require('../app/controller/artikelNew')

artikelNew.route('/artikelNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = artikelNew