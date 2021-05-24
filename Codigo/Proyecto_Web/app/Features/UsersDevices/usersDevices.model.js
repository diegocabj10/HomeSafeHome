const Sequelize = require("sequelize");
const dbConfig = require("../../../config/db.config");
const devicesModel = require("../Devices/devices.model");
const usersModel = require("../Users/users.model");
const { formatDate } = require('../../Shared/dateFormatter');

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
  dateAwayFromHome: {
    type: Sequelize.DATE,
    get: function (fieldName) {
      const formattedDate = formatDate(this.getDataValue(fieldName));
      return formattedDate ? formattedDate : null;
    },
  },
  startDate: {
    type: Sequelize.DATE,
    get: function (fieldName) {
      const formattedDate = formatDate(this.getDataValue(fieldName));
      return formattedDate ? formattedDate : null;
    },
  },
  deletionDate: {
    type: Sequelize.DATE,
    get: function (fieldName) {
      const formattedDate = formatDate(this.getDataValue(fieldName));
      return formattedDate ? formattedDate : null;
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    get: function (fieldName) {
      const formattedDate = formatDate(this.getDataValue(fieldName));
      return formattedDate ? formattedDate : null;
    },
  },
  updatedAt: {
    type: Sequelize.DATE,
    get: function (fieldName) {
      const formattedDate = formatDate(this.getDataValue(fieldName));
      return formattedDate ? formattedDate : null;
    },
  },
});

UserDevice.sync().then(
  async() => {
    await devicesModel.findOrCreate({
      defaults: { id: 1, name: 'Arduino1', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 1 }
    });
    await devicesModel.findOrCreate({
      defaults: { id: 2, name: 'Arduino2', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 2 }
    });
    await usersModel.findOrCreate({
      defaults: { id: 1, email: 'diegocampos0909@gmail.com', name: 'Diego', lastName: 'Campos', password: 'admin1234', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 1 }
    });
    await usersModel.findOrCreate({
      defaults: { id: 2, email: 'francoluna@gmail.com', name: 'Franco', lastName: 'Luna', password: 'admin1234', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 2 }
    });
    await usersModel.findOrCreate({
      defaults: { id: 3, email: 'marcostavorda@gmail.com', name: 'Marcos', lastName: 'Tavorda', password: 'admin1234', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 3 }
    });
    await usersModel.findOrCreate({
      defaults: { id: 4, email: 'diegomarchetti@gmail.com', name: 'Diego', lastName: 'Marchetti', password: 'admin1234', createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 4 }
    });
    UserDevice.findOrCreate({
      defaults: { id: 1, deviceId: 1, userId: 1, createdAt: Date.now(), updatedAt: Date.now() },
      where: { id: 1 }
    });
  }
);

module.exports = UserDevice;
