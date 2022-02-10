module.exports = (sequelize, Sequelize) => {
    var tagLomba = sequelize.define("tag_lomba", {
        tag: {
            type: Sequelize.STRING
        },
        kategori_lomba_id: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false,
        underscored: true
    });

    return tagLomba;
}