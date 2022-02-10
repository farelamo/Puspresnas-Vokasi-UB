var express = require('express')
var auth = express.Router()
var controller = require('../app/controller/auth')

auth.route('/login')
    .get(controller.login)
    .post(controller.post)

auth.route('/register')
    .get(controller.daftar)
    .post(controller.register)

auth.route('/logout').get(controller.logout)

module.exports = auth