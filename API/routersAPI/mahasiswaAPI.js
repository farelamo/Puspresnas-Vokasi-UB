let express = require('express')
let mahasiswaAPI = express.Router()
let controller = require('../controllerAPI/mahasiswaAPI')

mahasiswaAPI.get('/api/mahasiswa', controller.findAll)
mahasiswaAPI.get('/api/mahasiswa/:id', controller.findOne)

module.exports = mahasiswaAPI