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




UserDevice.sync().then(
  () => {
    devicesModel.findOrCreate({
      defaults: { id: 1, deviceName: 'Arduino1', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 1 }
    });
    devicesModel.findOrCreate({
      defaults: { id: 2, deviceName: 'Arduino2', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 2 }
    });
    usersModel.findOrCreate({
      defaults: { id: 1, email: 'diegocampos0909@gmail.com', name: 'Diego', lastName: 'Campos', password: 'asd1234', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 1 }
    });
    UserDevice.findOrCreate({
      defaults: { id: 1, deviceId: 1, userId: 1, createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 1 }
    });
  }
);

module.exports = UserDevice;
