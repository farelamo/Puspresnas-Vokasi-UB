module.exports = (sequelize, Sequelize) => {
    let tag = sequelize.define("tag", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        tag_lomba_id: {
            type: Sequelize.INTEGER
        },
        jenis_lomba_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });

    return tag;
}