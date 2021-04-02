const Sequelize = require("sequelize");
const dbConfig = require("../../../config/db.config");
const { formatDate } = require('../../Shared/dateFormatter');

const User = dbConfig.define("Users", {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  lastLogin: {
    type: Sequelize.DATE,
    get: function (fieldName) {
      const formattedDate = formatDate(this.getDataValue(fieldName));
      return formattedDate ? formattedDate : null;
    },
  },
  startDate: {
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

module.exports = User;
