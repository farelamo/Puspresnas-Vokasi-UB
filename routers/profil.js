const express = require('express')
const profil = express.Router()
const controller = require('../controller/profil')

profil.route('/profil')
    .get(controller.index)
    .post(controller.crud)

module.exports = profil