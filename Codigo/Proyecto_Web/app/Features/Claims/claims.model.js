const Sequelize = require('sequelize');
const dbConfig = require("../../../config/db.config");
const usersModel = require('../Users/users.model');
const { formatDate } = require('../../Shared/dateFormatter');


const Claim = dbConfig.define('Claims', {
    date: {
        type: Sequelize.DATE,
        get: function (fieldName) {
            const formattedDate = formatDate(this.getDataValue(fieldName));
            return formattedDate ? formattedDate : null;
        },
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
    administratorUserId: {
        type: Sequelize.INTEGER,
        references: {
            model: usersModel,
            key: 'id'
        },
        allowNull: false
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
module.exports = Claim;