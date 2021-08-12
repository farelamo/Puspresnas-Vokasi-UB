const express = require('express')
const mahasiswa = express.Router()
const controller = require('../controller/mahasiswa')

mahasiswa.route('/mahasiswa')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = mahasiswa

