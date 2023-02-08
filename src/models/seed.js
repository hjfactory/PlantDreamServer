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
        },
        planned_days: {
            type: Sequelize.INTEGER,
            defaultValue: 66,
            comment: "제목",
        }, 
        start_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            commont: "시작일"
        }
    }, {
        charset: "utf8", 
        collate: "utf8_general_ci",
        tableName: "pd_seeds",
        timestamps: true,
        paranoid: true,
    });

    Seed.associate = (db) => {
        // db.Seed.hasMany(db.Plant);
    }

    return Seed;
};