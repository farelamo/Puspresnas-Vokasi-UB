let express = require('express')
let TagAPI = express.Router()
let controller = require('../controllerAPI/tagAPI')

TagAPI.get('/api/tag', controller.findAll)
TagAPI.get('/api/tag/:id', controller.findOne)

module.exports = TagAPI