const express = require('express')
const login = express.Router()
const controller = require('../controller/login')

login.route('/login')
    .get(controller.login)
    .post(controller.post)

module.exports = login