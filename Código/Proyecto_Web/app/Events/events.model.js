const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
const Event = dbConfig.define('T_EVENTOS', {
  FECHA_EVENTO: {
    type: Sequelize.DATE
  },
  ID_SENIAL: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ID_DISPOSITIVO: {
    type: Sequelize.INTEGER,
    references: {
      model: modelDevice,
      key: 'id'
    },
    allowNull: false
  },
  VALOR: {
    type: Sequelize.INTEGER
  },
  FECHA_BAJA: {
    type: Sequelize.DATE
  }
});
module.exports = Event;