const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');

const Event = dbConfig.define('events', {
  date: {
    type: Sequelize.STRING
  },
  idOfSignal: {
    type: Sequelize.STRING
  },
  signal: {
    type: Sequelize.STRING
  },
  idOfDevice: {
    type: Sequelize.STRING
  },
  device: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  }
});
module.exports = Event;



