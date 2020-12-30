const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelUser = require('../Users/users.model')
const Notice = dbConfig.define('Notices', {
    noticeDate: {
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
            model: modelUser,
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
module.exports = Notice;
