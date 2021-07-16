const express = require('express')
const user = express.Router()
const controller = require('../controller/user')

user.route('/user')
    .get(controller.index)

module.exports = user