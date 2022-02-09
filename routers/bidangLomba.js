let express = require('express');
let bidangLomba = express.Router();
let controller = require('../app/controller/bidangLomba')

bidangLomba.route('/bidangLomba/:id')
    .get(controller.index)
    .post(controller.tambah)

module.exports = bidangLomba