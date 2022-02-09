let express = require('express')
let user = express.Router()
let controller = require('../app/controller/user')

user.route('/user')
    .get(controller.superadmin, controller.index)
    .post(controller.superadmin, controller.crud)

module.exports = user