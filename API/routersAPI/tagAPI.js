var express = require('express')
var TagAPI = express.Router()
var controller = require('../controllerAPI/tagAPI')

TagAPI.get('/api/tag', controller.findAll)
TagAPI.get('/api/tag/:id', controller.findOne)

module.exports = TagAPI