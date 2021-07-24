module.exports = (sequelize, Sequelize) => {
    const Artikel = sequelize.define("artikel", {
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
    }, 
    {
        freezeTableName: true,
        timestamps : false
    });

    return Artikel;
}