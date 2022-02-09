let express = require('express')
let lombaNew = express.Router()
let controller = require('../app/controller/lombaNew')

lombaNew.route('/lombaNew')
    .get(controller.index)

module.exports = lombaNew