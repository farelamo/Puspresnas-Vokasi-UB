let express = require('express')
let berita = express.Router()
let controller = require('../app/controller/berita')

berita.route('/berita')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = berita