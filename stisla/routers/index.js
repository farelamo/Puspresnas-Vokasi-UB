const express = require('express')
const index = express.Router()
const controller = require('../controller/index')

index.route('/')
    .get(controller.index)

module.exports = index