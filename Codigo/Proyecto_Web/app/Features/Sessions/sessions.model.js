const Sequelize = require("sequelize");
const dbConfig = require("../../../config/db.config");
const usersModel = require("../Users/users.model");
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
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Session;
