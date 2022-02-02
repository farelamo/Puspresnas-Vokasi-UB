const express = require('express')
const kontenCat = express.Router()
const controller = require('../app/controller/kontenCat')

kontenCat.route('/kontenCat')
    .get(controller.index)
    .post(controller.crud)

module.exports = kontenCat