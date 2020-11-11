const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
const modelUser = require('../Users/users.model');
const UserDevice = dbConfig.define('T_CONFIGURACIONES_NOTIFICACION', {
    ID_DISPOSITIVO: {
        type: Sequelize.INTEGER,
        references: {
            model: modelDevice,
            key: 'id'
        },
        allowNull: false
    },
    ID_USUARIO: {
        type: Sequelize.INTEGER,
        references: {
            model: modelUser,
            key: 'id'
        },
        allowNull: false
    },    
    FECHA_INICIO: {
      type: Sequelize.DATE
    },    
    FECHA_BAJA: {
      type: Sequelize.DATE
    },    
    FECHA_AFUERA_CASA: {
      type: Sequelize.DATE
    }
});
module.exports = UserDevice;