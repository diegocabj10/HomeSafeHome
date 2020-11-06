const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');

const Signal = dbConfig.define('T_SENIALES', {
  N_SENIAL: {
    type: Sequelize.STRING,
    unique: true
  },
  FECHA_BAJA: {
    type: Sequelize.DATE
  }
});
module.exports = Signal;