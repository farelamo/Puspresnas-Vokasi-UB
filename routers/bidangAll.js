var express = require('express')
var bidangAll = express.Router()
var controller = require('../app/controller/bidangAll')

bidangAll.route('/bidangAll/:id')
    .get(controller.index)
    .post(controller.delete)
    
module.exports = bidangAll