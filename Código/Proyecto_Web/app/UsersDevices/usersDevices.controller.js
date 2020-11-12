const Sequelize = require('sequelize');
// Find an userId from deviceId
exports.findUserIdfromDeviceId = async (eventDeviceId) => {

 const userId = await Sequelize.query(
    'SELECT ID_USUARIO FROM T_CONFIGURACIONES_NOTIFICACION WHERE ID_DISPOSITIVO = :deviceId',
    {
      replacements: { deviceId: eventDeviceId },
      type: Sequelize.SELECT
    }
  );
  console.log(userId)
  return userId;
  
};

