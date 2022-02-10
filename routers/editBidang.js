var express = require('express')
var bidangLomba = express.Router()
var controller = require('../app/controller/editBidang')

bidangLomba.route('/bidangAll/editBidang/:id')
    .get(controller.index)

bidangLomba.route('/editBidang/:id')
    .post(controller.edit)

module.exports = bidangLomba