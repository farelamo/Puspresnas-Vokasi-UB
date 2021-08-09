const express = require('express')
const mahasiswaEdit = express.Router()
const controller = require('../controller/mahasiswaEdit')

mahasiswaEdit.route('/mahasiswaEdit/:id')
    .get(controller.index)
    .post(controller.crud)

module.exports = mahasiswaEdit