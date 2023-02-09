const { Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  const LoginToken = sequelize.define("LoginToken", {
    token: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      comment: "UUID",
    },
    user_id: {
      type: Sequelize.UUID,
      comment: "User.Id",
    },
    email: {
      type: Sequelize.STRING(100),
      comment: "이메일",
    },
    expire_date: {
      type: Sequelize.DATE,
      comment: "유효일자",
    },
  }, {
    charset: "utf8", 
    collate: "utf8_general_ci",
    tableName: "pd_login_token",
    timestamps: true,
    paranoid: true,
  });

  LoginToken.associate = (db) => {
  }

  return LoginToken;
};