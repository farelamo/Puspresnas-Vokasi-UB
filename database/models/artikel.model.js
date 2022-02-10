module.exports = (sequelize, Sequelize) => {
    var Artikel = sequelize.define("artikel", {
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
            type: Sequelize.STRING,
            allowNull: false
        },
        kategori_konten_id: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false,
        underscored: true
    });

    return Artikel;
}