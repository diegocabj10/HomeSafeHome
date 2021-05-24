const notificationModel = require("./notifications.model");
const { getPagination, getPagingData } = require("../../Shared/pagination");
const dbConfig = require("../../../config/db.config");
const Op = dbConfig.Sequelize.Op;
const EventEmitter = require("events");
const userDeviceController = require("../UsersDevices/usersDevice.controller");
const notificationSettingsControler = require("../NotificationsSettings/notificationsSettings.controller");
const devicesControler = require("../Devices/devices.controller");


// Retrieve all Notifications from the database.
exports.findAll = async (req, res) => {
  const { page, size, title } = req.query;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  condition = { ...condition, userId: req.body.userId };
  try {
    const { limit, offset } = getPagination(page, size);
    const data = await notificationModel.findAndCountAll({
      where: condition,
      limit,
      offset,
      order: [['date', 'DESC']],
    });
    const response = getPagingData(data, page, limit);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Find a single Notification with an id
exports.findOne = async (req, res) => {
  try {
    const data = await notificationModel.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.notificationCreator = async (evento) => {
  let { id: eventId, signalId, deviceId, value } = evento;

  const MessageAndTitle = await getMessageAndTitle(signalId, value);

  let { userId: ownerUserId } = await userDeviceController.findOwnerUserIdfromDeviceId(deviceId);

  let { name: deviceName } = await devicesControler.findDeviceNamefromDeviceId(deviceId);
  //TODO Buscar en contactos todos los usuarios a los cuales se le va a generar la notificacion

  if (MessageAndTitle) {
    let { title, message } = MessageAndTitle;
    const eventEmitter = new EventEmitter();
    eventEmitter.once("New Notification", create);
    eventEmitter.emit("New Notification", eventId, title, message, ownerUserId, deviceName);
    //TODO crear notificaciones para cada uno de los contactos de confianza de los usuarios dueños
  }
};

const getMessageAndTitle = async (signalId, value) => {
  const valuesFromAndTo = await notificationSettingsControler.findValuesFromAndTo(signalId);
  return valuesFromAndTo.find((valueFromAndTo) => {
    return valueFromAndTo.valueFrom <= value && value <= valueFromAndTo.valueTo;
  });
}

// Create and Save a new Notification
const create = async (eventId, title, message, userId, deviceName) => {
  try {
    // Create and save a notification
    const newNotification = await notificationModel.create({
      date: new Date(),
      readDate: null,
      userId,
      eventId,
      title,
      message,
      deviceName
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};