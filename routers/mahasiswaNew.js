const express = require('express')
const mahasiswaNew = express.Router()
const controller = require('../app/controller/mahasiswaNew')

mahasiswaNew.route('/mahasiswaNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = mahasiswaNew