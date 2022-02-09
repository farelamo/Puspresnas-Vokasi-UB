let express = require('express')
let mahasiswaEdit = express.Router()
let controller = require('../app/controller/mahasiswaEdit')

mahasiswaEdit.route('/mahasiswaEdit/:id')
    .get(controller.index)
    .post(controller.crud)

module.exports = mahasiswaEdit