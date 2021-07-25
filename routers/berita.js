const express = require('express')
const berita = express.Router()
const controller = require('../controller/berita')

berita.route('/berita')
    .get(controller.index)
    .post(controller.crud)

berita.get('/api/berita', controller.findAll)
berita.get('/api/berita/:id', controller.findOne)
module.exports = berita