const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelUser = require('../Users/users.model');
const modelEvent = require('../Events/events.model');
const Notification = dbConfig.define('T_NOTIFICACIONES', {
    FECHA_NOTIFICACION: {
        type: Sequelize.DATE
    },
    ID_EVENTO: {
        type: Sequelize.INTEGER,
        references: {
            model: modelEvent,
            key: 'id'
        },
        allowNull: false
    },
    TITULO: {
        type: Sequelize.STRING
    },
    MENSAJE: {
        type: Sequelize.STRING
    },
    ID_USUARIO: {
        type: Sequelize.INTEGER,
        references: {
            model: modelUser,
            key: 'id'
        },
        allowNull: false
    },    
    FECHA_LECTURA: {
        type: Sequelize.DATE
    },
    FECHA_BAJA: {
        type: Sequelize.DATE
    }
});
module.exports = Notification;
