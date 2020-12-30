const eventModel = require("./events.model");
const notificationCreator = require("../NotificationsSettings/notificationsSettings.controller")
  .notificationCreator;

// Create and Save a new event
exports.create = async (req, res) => {
  // Create and save an event
  const Event = new dtoEvento(
    new Date(),
    req.body.eventSignalId,
    req.body.eventDeviceId,
    req.body.eventValue
  );
  try {
    // Save Event in the database
    const newEvent = await eventModel.create({
      eventDate: new Date(),
      signalId: req.body.signalId,
      deviceId: req.body.deviceId,
      value: req.body.value,
    });
    notificationCreator(newEvent);
    res.send(newEvent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
