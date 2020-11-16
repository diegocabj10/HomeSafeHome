const Sequelize = require('sequelize');
const dbConfig = require('../../config/db.config');
const modelDevice = require('../Devices/devices.model');
const modelUser = require('../Users/users.model');

const UserDevice = dbConfig.define('T_USUARIOS_DISPOSITIVOS', {
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

const findUserIdfromDeviceId = async (eventDeviceId) => {
  const userDevice = await UserDevice.findOne({ raw: true, where: { ID_DISPOSITIVO: eventDeviceId } });
  return userDevice;
};

module.exports = findUserIdfromDeviceId;