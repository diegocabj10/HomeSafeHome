const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
const modelSignal = require('../Signals/signals.model');
const NotificationSetting = dbConfig.define('T_CONFIGURACIONES_NOTIFICACIONES', {
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

const findValuesFromAndTo = async (eventSignalId) => {
    const valuesFromAndTo = await NotificationSetting.findAll({ raw: true, where: { ID_SENIAL: eventSignalId } });
    return valuesFromAndTo;
};

module.exports = findValuesFromAndTo;