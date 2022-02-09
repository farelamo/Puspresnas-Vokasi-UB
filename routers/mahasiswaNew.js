let express = require('express')
let mahasiswaNew = express.Router()
let controller = require('../app/controller/mahasiswaNew')

mahasiswaNew.route('/mahasiswaNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = mahasiswaNew