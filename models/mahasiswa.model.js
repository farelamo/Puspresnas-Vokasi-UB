module.exports = (sequelize, Sequelize) => {
    const Mahasiswa = sequelize.define("mahasiswa", {
        nama: {
            type: Sequelize.STRING
        },
        nim: {
            type: Sequelize.STRING
        },
        jurusan: {
            type: Sequelize.STRING
        },
        bidang_minat: {
            type: Sequelize.STRING
        },
        nama_lomba: {
            type: Sequelize.STRING
        },
        peringkat: {
            type: Sequelize.STRING
        },
        pelaksana: {
            type: Sequelize.STRING
        },
        id_berita: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false
    });

    return Mahasiswa;
}