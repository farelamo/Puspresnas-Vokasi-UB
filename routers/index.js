var express = require('express')
var index = express.Router()
var controller = require('../app/controller/index')

index.route('/')
    .get(controller.index)

module.exports = index