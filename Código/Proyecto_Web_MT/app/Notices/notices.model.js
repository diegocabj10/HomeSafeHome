const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelUser = require('../Users/users.model')
const Notice = dbConfig.define('T_AVISOS', {
    FECHA_AVISO: {
        type: Sequelize.DATE
    },
    TITULO: {
        type: Sequelize.STRING
    },
    MENSAJE: {
        type: Sequelize.STRING(400)
    },
    ID_USUARIO: {
        type: Sequelize.INTEGER,
        references: {
            model: modelUser,
            key: 'id'
        },
        allowNull: false
    },
    FECHA_BAJA: {
        type: Sequelize.DATE
    }
});
module.exports = Notice;
