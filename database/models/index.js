var dbConfig = require('../../app/config/db.config.js')
var Sequelize = require('sequelize')
var sequelize = new Sequelize(
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

var db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.artikel = require('./artikel.model.js')(sequelize,Sequelize)
db.berita = require('./berita.model.js')(sequelize,Sequelize)
db.bidangLomba = require('./bidangLomba.model.js')(sequelize,Sequelize)
db.jenisLomba = require('./jenisLomba.model.js')(sequelize,Sequelize)
db.kategoriKonten = require('./kategoriKonten.model.js')(sequelize,Sequelize)
db.kategoriLomba = require('./kategoriLomba.model.js')(sequelize,Sequelize)
db.tagLomba = require('./tagLomba.model.js')(sequelize,Sequelize)
db.tag = require('./tag.model.js')(sequelize,Sequelize)
db.user = require('./user.model.js')(sequelize,Sequelize)
db.mahasiswa = require('./mahasiswa.model.js')(sequelize,Sequelize)

// db.tagLomba.hasOne(db.kategoriLomba, {foreignKey: 'id'})
// db.tagLomba.belongsTo(db.kategoriLomba, {foreignKey: 'id'})

db.tagLomba.belongsTo(db.kategoriLomba)
db.artikel.belongsTo(db.kategoriKonten)
db.berita.belongsTo(db.kategoriKonten)
db.jenisLomba.belongsTo(db.kategoriLomba)
db.bidangLomba.belongsTo(db.jenisLomba)
db.mahasiswa.belongsTo(db.berita)
db.mahasiswa.belongsTo(db.jenisLomba)

db.jenisLomba.belongsToMany(db.tagLomba, {
    through: 'tag',
    foreignKey: 'jenis_lomba_id'
})
    
db.tagLomba.belongsToMany(db.jenisLomba, {
    through: 'tag',
    foreignKey: 'tag_lomba_id'
})

// db.tag.belongsTo(db.JenisLomba)
// db.tag.belongsTo(db.tagLomba)
// db.kategoriLomba.hasMany(db.tagLomba);

module.exports = db 
