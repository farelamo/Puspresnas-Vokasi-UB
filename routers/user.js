const express = require('express')
const user = express.Router()
const controller = require('../controller/user')

user.route('/user')
    .get(controller.index)
    //.post(controller.crud)

module.exports = user