const express = require('express');
const bidangLomba = express.Router();
const controller = require('../controller/bidangLomba')

bidangLomba.route('/bidangLomba/:id')
    .get(controller.index)
    .post(controller.tambah)

bidangLomba.get('/api/bidangLomba', controller.findAll)
bidangLomba.get('/api/bidangLomba/:id', controller.findOne)

module.exports = bidangLomba