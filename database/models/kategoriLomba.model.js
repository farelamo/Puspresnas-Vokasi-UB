module.exports = (sequelize, Sequelize) => {
    var kategoriKonten = sequelize.define("kategori_lomba", {
        kategori: {
            type: Sequelize.STRING
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false,
        underscored: true
    });

    return kategoriKonten;
}