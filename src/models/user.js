const { Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      comment: "UUID",
    },
    email: {
      type: Sequelize.STRING(100),
      validate: {
        isEmail: true,
      },
      comment: "이메일",
    },
    password: {
      type: Sequelize.STRING,
      comment: "암호화된 비밀번호",
    },
    salt: {
      type: Sequelize.STRING,
      comment: "비밀번호(암호화키)",
    },
    name: {
      type: Sequelize.STRING(100),
      comment: "이름",
    },
    phone: {
      type: Sequelize.STRING(72),
      comment: "전화번호",
    },
  }, {
    charset: "utf8", 
    collate: "utf8_general_ci",
    tableName: "pd_users",
    timestamps: true,
    paranoid: true,
  });

  User.associate = (db) => {
  }

  return User;
};