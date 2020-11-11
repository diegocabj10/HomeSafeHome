const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
const modelSignal = require('../Signals/signals.model');
const NotificationSetting = dbConfig.define('T_CONFIGURACIONES_NOTIFICACION', {
    ID_SENIAL: {
        type: Sequelize.INTEGER,
        references: {
            model: modelSignal,
            key: 'id'
        },
        allowNull: false
    },
    VALOR_DESDE: {
        type: Sequelize.INTEGER
    },
    VALOR_HASTA: {
        type: Sequelize.INTEGER
    },
    TITULO: {
        type: Sequelize.STRING
    },
    MENSAJE: {
        type: Sequelize.STRING
    }
});
module.exports = NotificationSetting;