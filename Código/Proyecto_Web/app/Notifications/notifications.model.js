const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelUser = require('../Users/users.model');
const modelEvent = require('../Events/events.model');
const Notification = dbConfig.define('Notifications', {
    notificationDate: {
        type: Sequelize.DATE
    },
    eventId: {
        type: Sequelize.INTEGER,
        references: {
            model: modelEvent,
            key: 'id'
        },
        allowNull: false
    },
    tittle: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: modelUser,
            key: 'id'
        },
        allowNull: false
    },    
    readDate: {
        type: Sequelize.DATE
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
module.exports = Notification;
