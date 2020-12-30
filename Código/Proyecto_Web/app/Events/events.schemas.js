const joi = require("joi");

const schemaCreateEvent = joi.object({
  eventDate: joi.date(),
  signalId: joi.number().min(0).required(),
  deviceId: joi.number().min(0).required(),
  value: joi.number().min(0).required(),
});

module.exports = {
  schemaCreateEvent
};
