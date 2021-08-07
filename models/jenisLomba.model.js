module.exports = (sequelize,Sequelize) => {
    const jenisLomba = sequelize.define('jenis_lomba',{
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
            type: Sequelize.STRING
        },
        id_kategori: {
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
        freezeTableName: true
    }
    )
    return jenisLomba
}