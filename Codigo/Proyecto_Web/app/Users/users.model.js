const Sequelize = require("sequelize");
const dbConfig = require("../../config/db.config");

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
  },
  startDate: {
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

module.exports = User;
