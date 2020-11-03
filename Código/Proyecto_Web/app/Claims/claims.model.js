const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelUser = require('../Users/users.model')
const Claim = dbConfig.define('T_RECLAMOS', {
    FECHA_RECLAMO: {
        type: Sequelize.DATE
    },
    TITULO: {
        type: Sequelize.STRING
    },
    MENSAJE: {
        type: Sequelize.STRING
    },
    RESPUESTA: {
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
    FECHA_BAJA: {
        type: Sequelize.DATE
    }
});
module.exports = Claim;