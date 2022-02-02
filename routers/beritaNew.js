const express = require('express')
const beritaNew = express.Router()
const controller = require('../app/controller/beritaNew')

beritaNew.route('/beritaNew')
    .get(controller.index)
    .post(controller.crud)

module.exports = beritaNew