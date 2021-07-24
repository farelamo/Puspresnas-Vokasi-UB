const express = require('express');
const bidangLomba = express.Router();
const controller = require('../controller/bidangLomba')

bidangLomba.route('/bidangLomba')
    .get(controller.index)
    .post(controller.tambah)

module.exports = bidangLomba