const express = require('express')
const berita = express.Router()
const controller = require('../app/controller/berita')

berita.route('/berita')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = berita