const Sequelize = require("sequelize");
const dbConfig = require("../../config/db.config");
const devicesModel = require("../Devices/devices.model");
const signalsModel = require("../Signals/signals.model");
const Event = dbConfig.define("Events", {
  eventDate: {
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
  deletioDate: {
    type: Sequelize.DATE,
  },
});
module.exports = Event;
