const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const User = require('../models/user')(sequelize);
const Seed = require('../models/seed')(sequelize);

const db = {};

db.sequelize = sequelize;

db.User = User;
User.associate(db);
db.Seed = Seed;
Seed.associate(db);

module.exports = db;