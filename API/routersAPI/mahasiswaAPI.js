var express = require('express')
var mahasiswaAPI = express.Router()
var controller = require('../controllerAPI/mahasiswaAPI')

mahasiswaAPI.get('/api/mahasiswa', controller.findAll)
mahasiswaAPI.get('/api/mahasiswa/:id', controller.findOne)

module.exports = mahasiswaAPI