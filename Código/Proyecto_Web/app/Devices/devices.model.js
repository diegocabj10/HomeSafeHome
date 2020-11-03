const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');

const Device = dbConfig.define('T_DISPOSITIVOS', {
  N_DISPOSITIVO: {
    type: Sequelize.STRING,
    unique: true
  },
  FECHA_BAJA: {
    type: Sequelize.DATE
  }
});
module.exports = Device;