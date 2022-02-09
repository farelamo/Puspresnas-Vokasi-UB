let express = require('express')
let mahasiswa = express.Router()
let controller = require('../app/controller/mahasiswa')

mahasiswa.route('/mahasiswa')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = mahasiswa

