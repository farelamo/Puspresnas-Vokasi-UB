module.exports = (sequelize, Sequelize) => {
    const kategoriKonten = sequelize.define("kategori_lomba", {
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