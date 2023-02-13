const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const User = require('../models/user')(sequelize);
const Seed = require('../models/seed')(sequelize);
const Plant = require('../models/plant')(sequelize);
const LoginToken = require('../models/loginToken')(sequelize);

const db = {};

db.sequelize = sequelize;

db.User = User;
db.Seed = Seed;
db.Plant = Plant;
db.LoginToken = LoginToken;

User.associate(db);
Seed.associate(db);
Plant.associate(db);
LoginToken.associate(db);

module.exports = db;