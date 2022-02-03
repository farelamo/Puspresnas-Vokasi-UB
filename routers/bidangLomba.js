var express = require('express');
var bidangLomba = express.Router();
var controller = require('../app/controller/bidangLomba')

bidangLomba.route('/bidangLomba/:id')
    .get(controller.index)
    .post(controller.tambah)

module.exports = bidangLomba