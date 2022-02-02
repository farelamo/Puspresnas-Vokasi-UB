const express = require('express')
const login = express.Router()
const controller = require('../app/controller/login')

login.route('/login')
    .get(controller.login)
    .post(controller.post)

module.exports = login