let express = require('express')
let lombaAll = express.Router()
let controller = require('../app/controller/lombaAll')

lombaAll.route('/lombaAll')
    .get(controller.index)
    .post(controller.crud)

module.exports = lombaAll