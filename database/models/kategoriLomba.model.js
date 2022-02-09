module.exports = (sequelize, Sequelize) => {
    let kategoriKonten = sequelize.define("kategori_lomba", {
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