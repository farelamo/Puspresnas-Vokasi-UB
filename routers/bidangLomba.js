const express = require('express');
const bidangLomba = express.Router();
const controller = require('../controller/bidangLomba')

bidangLomba.route('/bidangLomba/:id')
    .get(controller.index)
    .post(controller.tambah)

module.exports = bidangLomba