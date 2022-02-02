const express = require('express')
const user = express.Router()
const controller = require('../app/controller/user')

user.route('/user')
    .get(controller.index)
    .post(controller.crud)

module.exports = user