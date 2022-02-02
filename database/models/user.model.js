module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
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
        refresh_token: {
            type: Sequelize.TEXT
        }
    }, 
    {
        freezeTableName: true,
        timestamps : false,
        underscored: true
    });

    return user;
}