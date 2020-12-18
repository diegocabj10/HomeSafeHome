const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
const modelUser = require('../Users/users.model');

const UserDevice = dbConfig.define('UsersDevices', {
  deviceId: {
    type: Sequelize.INTEGER,
    references: {
      model: modelDevice,
      key: 'id'
    },
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: modelUser,
      key: 'id'
    },
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE
  },
  deletionDate: {
    type: Sequelize.DATE
  },
  dateAwayFromHome: {
    type: Sequelize.DATE
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }  
});

const findUserIdfromDeviceId = async (deviceId) => {
  const userDevice = await UserDevice.findOne({ raw: true, where: { userId: deviceId } });
  return userDevice;
};

module.exports = findUserIdfromDeviceId;