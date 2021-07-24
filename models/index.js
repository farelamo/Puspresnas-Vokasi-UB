const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password, {
        host : dbConfig.host,
        dialect : dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire : dbConfig.pool.min,
            idle : dbConfig.pool.idle
        }
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.posts = require('./posts.model.js')(sequelize,Sequelize)
db.artikel = require('./artikel.model.js')(sequelize,Sequelize)

module.exports = db 
