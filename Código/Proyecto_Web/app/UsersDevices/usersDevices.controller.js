const Sequelize = require('sequelize');

// Find an userId from deviceId
exports.findUserIdfromDeviceId = async (eventDeviceId) => {

 const UserId = await Sequelize.quer(
    'SELECT ID_USUARIO FROM T_CONFIGURACIONES_NOTIFICACION WHERE ID_DISPOSITIVO = :deviceId',
    {
      replacements: { deviceId: eventDeviceId },
      type: QueryTypes.SELECT
    }
  );
  return UserId;
  
};

