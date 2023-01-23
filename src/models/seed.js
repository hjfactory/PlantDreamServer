const { Sequelize } = require("sequelize");
module.exports = (sequelize) => { 
    const Seed = sequelize.define("Seed", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: "아이디",
        },
        user_id: {
            type: Sequelize.UUID,
            comment: "User.id",
        },
        title: {
            type: Sequelize.STRING(100),
            comment: "제목",
        }
    }, {
        charset: "utf8", 
        collate: "utf8_general_ci",
        tableName: "pd_seeds",
        timestamps: true,
        paranoid: true,
    });

    Seed.associate = (db) => {
    }

    return Seed;
};