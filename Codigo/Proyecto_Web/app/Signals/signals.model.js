const Sequelize = require("sequelize");
const dbConfig = require("../../config/db.config");

const Signal = dbConfig.define("Signals", {
  signalName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  signalDate: {
    type: Sequelize.DATE,
  },
  deletionDate: {
    type: Sequelize.DATE,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Signal;