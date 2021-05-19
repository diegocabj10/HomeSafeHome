const Sequelize = require("sequelize");
const dbConfig = require("../../../config/db.config");
const usersModel = require('../Users/users.model');
const { formatDate } = require('../../Shared/dateFormatter');

const Contact = dbConfig.define("Contacts", {
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
    phone: {
        type: Sequelize.STRING,
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

module.exports = Contact;
