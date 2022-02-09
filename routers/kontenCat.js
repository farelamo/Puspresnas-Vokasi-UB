let express = require('express')
let kontenCat = express.Router()
let controller = require('../app/controller/kontenCat')

kontenCat.route('/kontenCat')
    .get(controller.index)
    .post(controller.crud)

module.exports = kontenCat