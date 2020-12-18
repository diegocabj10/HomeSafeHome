const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
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
    tittle: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    }
});

const findValuesFromAndTo = async (signalId) => {
    const valuesFromAndTo = await NotificationSetting.findAll({ raw: true, where: { signalId: signalId } });
    return valuesFromAndTo;
};

module.exports = findValuesFromAndTo;