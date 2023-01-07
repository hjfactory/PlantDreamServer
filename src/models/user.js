module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "UUID",
      },
      email: {
        type: DataTypes.STRING(100),
        validate: {
          isEmail: true,
        },
        comment: "이메일",
      },
      password: {
        type: DataTypes.STRING(60),
        comment: "비밀번호",
      },
      name: {
        type: DataTypes.STRING(100),
        comment: "이름",
      },
      phone: {
        type: DataTypes.STRING(72),
        comment: "전화번호",
      },
    }, {
      charset: "utf8", 
      collate: "utf8_general_ci",
      tableName: "pd_users",
      timestamps: true,
      paranoid: true,
    });
  
    return User;
  };