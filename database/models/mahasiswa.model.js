module.exports = (sequelize, Sequelize) => {
    var Mahasiswa = sequelize.define('mahasiswa', {
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
        peringkat: {
            type: Sequelize.STRING
        },
        jenis_lomba_id: {
            type: Sequelize.INTEGER
        },
        beritum_id: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false,
        underscored: true
    })

    return Mahasiswa;
}