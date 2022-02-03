var express = require('express')
var profil = express.Router()
var controller = require('../app/controller/profil')

profil.route('/profil')
    .get(controller.index)
    .post(controller.crud)

module.exports = profil