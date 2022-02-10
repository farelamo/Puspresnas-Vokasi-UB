module.exports = (sequelize, Sequelize) => {
    var kategoriKonten = sequelize.define("kategori_konten", {
        kategori: {
            type: Sequelize.STRING
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false
    });

    return kategoriKonten;
}