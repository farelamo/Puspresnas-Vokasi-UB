const express = require('express')
const bidangLomba = express.Router()
const controller = require('../controller/editBidang')

bidangLomba.route('/editBidang')
    .post(controller.edit)

module.exports = bidangLomba