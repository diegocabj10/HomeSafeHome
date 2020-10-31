const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');

const Event = dbConfig.define('T_EVENTOS', {
  ID_EVENTO: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
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
      model: T_DISPOSITIVOS,
      key: 'ID_DISPOSITIVO'
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