module.exports = (sequelize, Sequelize) => {
    const tagLomba = sequelize.define("tag_lomba", {
        tag: {
            type: Sequelize.STRING
        },
        id_kategori_lomba: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false
    });

    return tagLomba;
}