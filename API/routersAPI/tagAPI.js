const express = require('express')
const TagAPI = express.Router()
const controller = require('../controllerAPI/TagAPI')

TagAPI.get('/api/tag', controller.findAll)
TagAPI.get('/api/tag/:id', controller.findOne)

module.exports = TagAPI