const express = require('express')
const artikel = express.Router()
const controller = require('../controller/artikel')

artikel.route('/artikel')
    .get(controller.index)
    .post(controller.crud)

    artikel.get('/api/artikel', controller.findAll)
    artikel.get("/api/artikel/:id", controller.findOne)
    
module.exports = artikel