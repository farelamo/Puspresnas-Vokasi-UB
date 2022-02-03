module.exports = (sequelize,Sequelize) => {
    var Berita = sequelize.define('berita', 
    {
        judul: {
            type: Sequelize.STRING
        },
        deskripsi: {
            type: Sequelize.STRING
        },
        isi: {
            type: Sequelize.STRING(2000)
        },
        tanggal: {
            type: Sequelize.STRING
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kategori_konten_id: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    })

    return Berita
}