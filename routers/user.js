var express = require('express')
var user = express.Router()
var controller = require('../app/controller/user')

user.route('/user')
    .get(controller.index)
    .post(controller.crud)

module.exports = user