const eventModel = require("./events.model");
const { notificationCreator } = require("../Notifications/notifications.controller");

// Create and Save a new event
exports.create = async (req, res) => {
  try {
    // Create and save an event
    const newEvent = await eventModel.create({
      date: new Date(),
      signalId: req.body.signalId,
      deviceId: req.body.deviceId,
      value: req.body.value,
    });
    notificationCreator(newEvent.get());
    res.send(newEvent.get());
  } catch (err) {
    res.status(500).send(err.message);
  }
};
