var express = require('express')
var artikel = express.Router()
var controller = require('../app/controller/artikel')

artikel.route('/artikel')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = artikel