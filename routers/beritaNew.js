let express = require('express')
let beritaNew = express.Router()
let controller = require('../app/controller/beritaNew')

beritaNew.route('/beritaNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = beritaNew