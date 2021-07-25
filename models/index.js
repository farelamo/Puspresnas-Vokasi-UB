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
            acquire : dbConfig.pool.acquire,
            idle : dbConfig.pool.idle
        }
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.posts = require('./posts.model.js')(sequelize,Sequelize)
db.artikel = require('./artikel.model.js')(sequelize,Sequelize)
db.berita = require('./berita.model.js')(sequelize,Sequelize)
db.bidangLomba = require('./bidangLomba.model.js')(sequelize,Sequelize)
db.jenisLomba = require('./jenisLomba.model.js')(sequelize,Sequelize)
db.kategoriKonten = require('./kategoriKonten.model.js')(sequelize,Sequelize)
db.kategoriLomba = require('./kategoriLomba.model.js')(sequelize,Sequelize)
db.tagLomba = require('./tagLomba.model.js')(sequelize,Sequelize)
db.tag = require('./tag.model.js')(sequelize,Sequelize)

module.exports = db 
