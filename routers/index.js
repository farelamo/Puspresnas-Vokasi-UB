let express = require('express')
let index = express.Router()
let controller = require('../app/controller/index')

index.route('/')
    .get(controller.index)

module.exports = index