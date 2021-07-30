const express = require('express')
const bidangLomba = express.Router()
const controller = require('../controller/editBidang')

bidangLomba.route('/bidangAll/editBidang/:id')
    .get(controller.index)

bidangLomba.route('/editBidang/:id')
    .post(controller.edit)

module.exports = bidangLomba