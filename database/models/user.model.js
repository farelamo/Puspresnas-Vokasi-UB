module.exports = (sequelize, Sequelize) => {
    let user = sequelize.define("user", {
        nama: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.ENUM(['Superadmin', 'Admin'])
        },
        foto: {
            type: Sequelize.STRING
        },
        is_active: {
            type: Sequelize.TINYINT
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false,
        underscored: true
    });

    return user;
}