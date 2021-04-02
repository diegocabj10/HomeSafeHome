const Sequelize = require("sequelize");
const dbConfig = require("../../../config/db.config");
const devicesModel = require("../Devices/devices.model");
const signalsModel = require("../Signals/signals.model");
const { formatDate } = require('../../Shared/dateFormatter');

const Event = dbConfig.define("Events", {
  date: {
    type: Sequelize.DATE,
  },
  signalId: {
    type: Sequelize.INTEGER,
    references: {
      model: signalsModel,
      key: "id",
    },
    allowNull: false,
  },
  deviceId: {
    type: Sequelize.INTEGER,
    references: {
      model: devicesModel,
      key: "id",
    },
    allowNull: false,
  },
  value: {
    type: Sequelize.INTEGER,
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
module.exports = Event;
