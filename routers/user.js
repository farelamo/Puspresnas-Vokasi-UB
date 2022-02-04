var express = require('express')
var user = express.Router()
var controller = require('../app/controller/user')

user.route('/user')
    .get(controller.superadmin, controller.index)
    .post(controller.superadmin, controller.crud)

module.exports = user