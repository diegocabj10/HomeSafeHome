const Sequelize = require('sequelize');
const dbConfig = require("../../../config/db.config");
const usersModel = require('../Users/users.model');
const Claim = dbConfig.define('Claims', {
    claimDate: {
        type: Sequelize.DATE
    },
    title: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    },
    response: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: usersModel,
            key: 'id'
        },
        allowNull: false
    },
    deletionDate: {
        type: Sequelize.DATE
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }  
});
module.exports = Claim;