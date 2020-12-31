const EventEmitter = require("events");
const findUserIdfromDeviceId = require("../UsersDevices/usersDevices.model");
const findValuesFromAndTo = require("./notificationsSettings.model");
const { create } = require("../Notifications/notifications.controller");
exports.notificationCreator = async (evento) => {
   let { id: eventId, signalId, deviceId, value } = evento.dataValues;
  const userDevice = await findUserIdfromDeviceId(deviceId);
  let { userId } = userDevice;

  const valuesFromAndTo = await findValuesFromAndTo(signalId);

  const MessageAndTitle = valuesFromAndTo.find((valueFromAndTo) => {
    return valueFromAndTo.valueFrom <= value && value <= valueFromAndTo.valueTo;
  });
  if (MessageAndTitle) {
    let { title, message } = MessageAndTitle ? MessageAndTitle : null;
    const ee = new EventEmitter();
    ee.addListener("New Notification", create);
    ee.emit("New Notification", eventId, title, message, userId);
  }
};
