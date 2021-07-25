module.exports = (sequelize,Sequelize) => {
    const Berita = sequelize.define('berita', 
    {
        judul: {
            type: Sequelize.STRING
        },
        deskripsi: {
            type: Sequelize.STRING
        },
        isi: {
            type: Sequelize.STRING
        },
        tanggal: {
            type: Sequelize.STRING
        },
        foto: {
            type: Sequelize.STRING
        },
        id_kategori: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })

    return Berita
}