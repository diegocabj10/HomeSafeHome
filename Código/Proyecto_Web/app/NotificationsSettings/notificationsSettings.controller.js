
const EventEmitter = require('events').EventEmitter;
const userDeviceController = require('../UsersDevices/usersDevices.controller');
exports.notificationCreator = (evento) => {
  // id_senial 1 MONOXIDO DE CARBONO Valores
  // id_senial 3 PUERTA (0=abierto, 1 = cerrado) 
  // 2 LUZ
  // 4 GARAGE
  let {
    eventDate, eventSignalId,
    eventDeviceId, eventValue
  } = evento;

  //Obtener id_usuario con deviceId desde t_usuarios_dispositivos
  const userId = userDeviceController.findUserIdfromDeviceId(eventDeviceId);
  //Obtener valor_desde y valor_hasta, segun el id_senial de t_configuraciones_notificacion

  //Si el valor se encuentra entre los valores obtenidos, obtener el titulo y mensaje de t_configuraciones_notificacion

  return { userId };

  //Con estos valores despues hay que insertar el registro en T_NOTIFICACIONES
};


