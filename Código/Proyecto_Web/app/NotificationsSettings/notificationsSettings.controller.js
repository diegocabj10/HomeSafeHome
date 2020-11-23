
const EventEmitter = require('events');
const findUserIdfromDeviceId = require('../UsersDevices/usersDevices.model');
const findValuesFromAndTo = require('./notificationsSettings.model');
const { create } = require('../Notifications/notifications.controller');
exports.notificationCreator = async (evento) => {
  // id_senial 1 MONOXIDO DE CARBONO Valores
  // id_senial 3 PUERTA (0=abierto, 1 = cerrado) 
  // 2 LUZ
  // 4 GARAGE
  let {
    id: eventId, FECHA_EVENTO: eventDate, ID_SENIAL: eventSignalId,
    ID_DISPOSITIVO: eventDeviceId, VALOR: eventValue
  } = evento.dataValues;
  //Obtener id_usuario con deviceId desde t_usuarios_dispositivos
  const userDevice = await findUserIdfromDeviceId(eventDeviceId);
  let { ID_USUARIO: userId } = userDevice;

  //Obtener valor_desde y valor_hasta, segun el id_senial de t_configuraciones_notificacion
  const valuesFromAndTo = await findValuesFromAndTo(eventSignalId);

  //Si el valor se encuentra entre los valores obtenidos, obtener el titulo y mensaje de t_configuraciones_notificacion
  const MessageAndTitle = valuesFromAndTo.filter(function (valueFromAndTo) {
    return valueFromAndTo.VALOR_DESDE <= eventValue && eventValue <= valueFromAndTo.VALOR_HASTA;
  });

  let {
    TITULO: tittle, MENSAJE: message
  } = MessageAndTitle;
  //Con estos valores despues hay que insertar el registro en T_NOTIFICACIONES
  const ee = new EventEmitter();
  ee.addListener('New Notification', create);
  ee.emit('New Notification', eventId, tittle, message, userId)
}


