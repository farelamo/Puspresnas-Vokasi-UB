const express = require('express')
const index = express.Router()
const controller = require('../app/controller/index')

index.route('/')
    .get(controller.index)

module.exports = index