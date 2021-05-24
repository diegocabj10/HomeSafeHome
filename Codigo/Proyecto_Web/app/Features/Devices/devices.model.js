const Sequelize = require("sequelize");
const dbConfig = require("../../../config/db.config");
const { formatDate } = require('../../Shared/dateFormatter');

const Device = dbConfig.define("Devices", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  date: {
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

module.exports = Device;
