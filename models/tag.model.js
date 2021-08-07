module.exports = (sequelize, Sequelize) => {
    const tag = sequelize.define("tag", {
        id_jenis: {
            type: Sequelize.INTEGER
        },
        id_tag_lomba: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        indexes: [{
                unique: false,
                fields: ['id_jenis']
            },
            {
                unique: false,
                fields: ['id_tag_lomba']
            }
        ]
    });

    return tag;
}