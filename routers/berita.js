var express = require('express')
var berita = express.Router()
var controller = require('../app/controller/berita')

berita.route('/berita')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = berita