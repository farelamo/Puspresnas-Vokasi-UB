const express = require('express')
const profil = express.Router()
const controller = require('../controller/profil')

profil.route('/profil')
    .get(controller.index)

module.exports = profil