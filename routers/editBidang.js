let express = require('express')
let bidangLomba = express.Router()
let controller = require('../app/controller/editBidang')

bidangLomba.route('/bidangAll/editBidang/:id')
    .get(controller.index)

bidangLomba.route('/editBidang/:id')
    .post(controller.edit)

module.exports = bidangLomba