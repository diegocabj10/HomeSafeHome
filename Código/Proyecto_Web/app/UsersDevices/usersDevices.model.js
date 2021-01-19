const Sequelize = require("sequelize");
const dbConfig = require("../../config/db.config");
const devicesModel = require("../Devices/devices.model");
const usersModel = require("../Users/users.model");

const UserDevice = dbConfig.define("UsersDevices", {
  deviceId: {
    type: Sequelize.INTEGER,
    references: {
      model: devicesModel,
      key: "id",
    },
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: usersModel,
      key: "id",
    },
    allowNull: false,
  },
  startDate: {
    type: Sequelize.DATE,
  },
  deletionDate: {
    type: Sequelize.DATE,
  },
  dateAwayFromHome: {
    type: Sequelize.DATE,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = UserDevice;
