module.exports = (sequelize,Sequelize) => {
    const bidangLomba = sequelize.define('bidang_lomba',
    {
        nama_bidang: {
            type: Sequelize.STRING
        },
        desk: {
            type: Sequelize.STRING
        },
        biaya: {
            type: Sequelize.STRING
        },
        hadiah: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        file: {
            type: Sequelize.STRING
        },
        id_jenis: {
            type: Sequelize.INTEGER
        },
        gambar: {
            type: Sequelize.STRING
        }
    },
        { 
            timestamps: false,
            freezeTableName: true
        }
    )

    return bidangLomba
}