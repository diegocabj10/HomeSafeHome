const Sequelize = require('sequelize');
const newDatabase = new Sequelize('hsh', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
module.exports = newDatabase;