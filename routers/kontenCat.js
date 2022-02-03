var express = require('express')
var kontenCat = express.Router()
var controller = require('../app/controller/kontenCat')

kontenCat.route('/kontenCat')
    .get(controller.index)
    .post(controller.crud)

module.exports = kontenCat