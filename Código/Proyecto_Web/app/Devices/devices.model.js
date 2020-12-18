const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');

const Device = dbConfig.define('Devices', {
  deviceName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  deviceDate: {
    type: Sequelize.DATE
  },
  deletionDate: {
    type: Sequelize.DATE
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }  
});
module.exports = Device;