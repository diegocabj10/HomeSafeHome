const EventEmitter = require("events");
const findUserIdfromDeviceId = require("../UsersDevices/usersDevices.model");
const findValuesFromAndTo = require("./notificationsSettings.model");
const { create } = require("../Notifications/notifications.controller");
exports.notificationCreator = async (evento) => {
  // id_senial 1 MONOXIDO DE CARBONO Valores
  // id_senial 3 PUERTA (0=abierto, 1 = cerrado)
  // 2 LUZ
  // 4 GARAGE
  let { eventId, eventDate, signalId, deviceId, value } = evento.dataValues;
  //Obtener id_usuario con deviceId desde t_usuarios_dispositivos
  const userDevice = await findUserIdfromDeviceId(deviceId);
  let { userId } = userDevice;

  //Obtener valor_desde y valor_hasta, segun el id_senial de t_configuraciones_notificacion
  const valuesFromAndTo = await findValuesFromAndTo(signalId);

  //Si el valor se encuentra entre los valores obtenidos, obtener el titulo y mensaje de t_configuraciones_notificacion
  const MessageAndTitle = valuesFromAndTo.find((valueFromAndTo) => {
    return (
      valueFromAndTo.valueFrom <= value &&
      value <= valueFromAndTo.valueTo
    );
  });

  let { tittle, message } = MessageAndTitle;
  //Con estos valores despues hay que insertar el registro en T_NOTIFICACIONES
  const ee = new EventEmitter();
  ee.addListener("New Notification", create);
  ee.emit("New Notification", eventId, tittle, message, userId);
};
