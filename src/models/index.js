const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user')(sequelize, Sequelize.DataTypes);

const db = {};

db.sequelize = sequelize;

db.User = User;
if(User.associate){
    User.associate(db);
}

module.exports = db;