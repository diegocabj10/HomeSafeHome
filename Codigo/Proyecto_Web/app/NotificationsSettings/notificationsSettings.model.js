const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelSignal = require('../Signals/signals.model');
const NotificationSetting = dbConfig.define('NotificationsSettings', {
    signalId: {
        type: Sequelize.INTEGER,
        references: {
            model: modelSignal,
            key: 'id'
        },
        allowNull: false
    },
    valueFrom: {
        type: Sequelize.INTEGER
    },
    valueTo: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    }
});

module.exports = NotificationSetting;