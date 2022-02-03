var express = require('express')
var mahasiswa = express.Router()
var controller = require('../app/controller/mahasiswa')

mahasiswa.route('/mahasiswa')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = mahasiswa

