let express = require('express')
let profil = express.Router()
let controller = require('../app/controller/profil')

profil.route('/profil')
    .get(controller.index)
    .post(controller.crud)

module.exports = profil