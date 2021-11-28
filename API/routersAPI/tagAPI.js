const express = require('express')
const TagAPI = express.Router()
const controller = require('../controllerAPI/tagAPI')

TagAPI.get('/api/tag', controller.findAll)
TagAPI.get('/api/tag/:id', controller.findOne)

module.exports = TagAPI