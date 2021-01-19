const EventEmitter = require("events");
const notificationSettingModel = require("./notificationsSettings.model");
const findUserIdfromDeviceId = require("../UsersDevices/usersDevice.controller");
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

const findValuesFromAndTo = async (signalId) => {
  const valuesFromAndTo = await notificationSettingModel.findAll({
    raw: true,
    where: { signalId: signalId },
  });
  return valuesFromAndTo;
};
