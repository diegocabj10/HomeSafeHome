const Sequelize = require('sequelize');
const dbConfig = require("../../../config/db.config");
const usersModel = require('../Users/users.model');
const eventsModel = require('../Events/events.model');
const { formatDate } = require('../../Shared/dateFormatter');

const Notification = dbConfig.define('Notifications', {
  date: {
    type: Sequelize.DATE,
    get: function (fieldName) {
      const formattedDate = formatDate(this.getDataValue(fieldName));
      return formattedDate ? formattedDate : null;
    },
  },
  eventId: {
    type: Sequelize.INTEGER,
    references: {
      model: eventsModel,
      key: 'id',
    },
    allowNull: false,
  },
  deviceName: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: usersModel,
      key: 'id',
    },
    allowNull: false,
  },
  readDate: {
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
module.exports = Notification;
