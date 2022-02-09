let express = require('express')
let bidangAll = express.Router()
let controller = require('../app/controller/bidangAll')

bidangAll.route('/bidangAll/:id')
    .get(controller.index)
    .post(controller.delete)
    
module.exports = bidangAll