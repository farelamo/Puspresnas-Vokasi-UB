module.exports = (sequelize, Sequelize) => {
    const kategoriKonten = sequelize.define("kategori_konten", {
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