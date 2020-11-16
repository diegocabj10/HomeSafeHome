const dtoEvento = require('./events.dto');
const eventModel = require('./events.model');
const notificationCreator = require('../NotificationsSettings/notificationsSettings.controller').notificationCreator;

// Create and Save a new Event
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.eventValue) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }
  // Create a Event
  const Event = new dtoEvento(new Date(), req.body.eventSignalId, req.body.eventDeviceId, req.body.eventValue);
  // Save Event in the database
  eventModel.create(Event.toJSON)
    .then(data => {
      notificationCreator(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Event.'
      });
    });

}

