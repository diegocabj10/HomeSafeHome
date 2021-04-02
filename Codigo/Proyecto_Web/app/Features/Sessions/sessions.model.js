const Sequelize = require("sequelize");
const dbConfig = require("../../../config/db.config");
const usersModel = require("../Users/users.model");
const { formatDate } = require('../../Shared/dateFormatter');

const Session = dbConfig.define("Sessions", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: usersModel,
      key: "id",
    },
    allowNull: false,
  },
  refreshToken: {
    type: Sequelize.TEXT('long'),
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

module.exports = Session;
