module.exports = (sequelize,Sequelize) => {
    let jenisLomba = sequelize.define('jenis_lomba',{
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        nama_lomba: {
            type: Sequelize.STRING
        },
        sumber: {
            type: Sequelize.STRING
        },
        desk: {
            type: Sequelize.STRING(2000)
        },
        tipe: {
            type: Sequelize.ENUM(['Team', 'Individu'])
        },
        kategori_lomba_id: {
            type: Sequelize.INTEGER
        },
        tanggal: {
            type: Sequelize.STRING
        },
        gambar: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
    )
    return jenisLomba
}