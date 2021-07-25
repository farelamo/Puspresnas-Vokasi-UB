const express = require('express')
const tag = express.Router()
const controller = require('../controller/tag')

tag.get('/api/tag', controller.findAll)
tag.get('/api/tag/:id', controller.findOne)

module.exports = tag