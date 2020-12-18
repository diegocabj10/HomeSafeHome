const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
const modelSignal = require('../Signals/signals.model');
const Event = dbConfig.define('Events', {
  eventDate: {
    type: Sequelize.DATE
  },
  signalId: {
    type: Sequelize.INTEGER,
    references: {
      model: modelSignal,
      key: 'id'
    },
    allowNull: false
  },
  deviceId: {
    type: Sequelize.INTEGER,
    references: {
      model: modelDevice,
      key: 'id'
    },
    allowNull: false
  },
  value: {
    type: Sequelize.INTEGER
  },
  deletioDate: {
    type: Sequelize.DATE
  }
});
module.exports = Event;