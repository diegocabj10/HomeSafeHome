const Sequelize = require("sequelize");
const dbConfig = require("../../config/db.config");
const usersModel = require("../Users/users.model");
const eventsModel = require("../Events/events.model");
const Notification = dbConfig.define("Notifications", {
  notificationDate: {
    type: Sequelize.DATE,
  },
  eventId: {
    type: Sequelize.INTEGER,
    references: {
      model: eventsModel,
      key: "id",
    },
    allowNull: false,
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
      key: "id",
    },
    allowNull: false,
  },
  readDate: {
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
module.exports = Notification;
