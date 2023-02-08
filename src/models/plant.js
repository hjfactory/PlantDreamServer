const { Sequelize } = require("sequelize");
module.exports = (sequelize) => { 
    const Plant = sequelize.define("Plant", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "id",
      },
      seed_id: {
        type: Sequelize.INTEGER,
        comment: "Seed.id",
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        commont: "일자"
      },
      weight: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        commont: "가중치"
      }
    }, {
        charset: "utf8", 
        collate: "utf8_general_ci",
        tableName: "pd_plants",
        timestamps: true,
        paranoid: true,
    }
  );

  Plant.associate = (db) => {
  }

  return Plant;
};