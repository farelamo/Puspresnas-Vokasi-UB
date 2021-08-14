module.exports = (sequelize, Sequelize) => {
    const bidangLomba = sequelize.define('bidang_lomba', {
        nama_bidang: {
            type: Sequelize.STRING
        },
        desk: {
            type: Sequelize.STRING(2000)
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
        jenis_lomba_id: {
            type: Sequelize.INTEGER
        },
        gambar: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    })

    return bidangLomba
}