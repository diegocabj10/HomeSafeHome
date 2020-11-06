
const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');

const User = dbConfig.define('T_USUARIOS', {
    LOGIN: {
        type: Sequelize.STRING
    },
    EMAIL: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    NOMBRE: {
        type: Sequelize.STRING
    },
    APELLIDO: {
        type: Sequelize.STRING
    },
    PASSWORD: {
        type: Sequelize.STRING
    },
    ULTIMO_LOGIN: {
        type: Sequelize.DATE
    },
    FECHA_BAJA: {
        type: Sequelize.DATE
    }
});
module.exports = User;