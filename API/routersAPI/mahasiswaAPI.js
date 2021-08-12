const express = require('express')
const mahasiswaAPI = express.Router()
const controller = require('../controllerAPI/mahasiswaAPI')

mahasiswaAPI.get('/api/mahasiswa', controller.findAll)
mahasiswaAPI.get('/api/mahasiswa/:id', controller.findOne)

module.exports = mahasiswaAPI