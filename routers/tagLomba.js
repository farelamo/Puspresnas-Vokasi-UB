const express = require('express')
const tagLomba = express.Router()
const controller = require('../controller/tagLomba')

tagLomba.get('/api/tagLomba', controller.findAll)
tagLomba.get('/api/tagLomba/:id', controller.findOne)

module.exports = tagLomba