const express = require('express')
const bidangAll = express.Router()
const controller = require('../controller/bidangAll')

bidangAll.route('/bidangAll/:id')
    .get(controller.index)
    .post(controller.delete)
    
module.exports = bidangAll