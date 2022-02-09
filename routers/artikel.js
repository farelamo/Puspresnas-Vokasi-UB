let express = require('express')
let artikel = express.Router()
let controller = require('../app/controller/artikel')

artikel.route('/artikel')
    .get(controller.index)
    .post(controller.crud)
    
module.exports = artikel