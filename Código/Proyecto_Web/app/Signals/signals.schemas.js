const joi = require("joi");

const schemaCreateSignal = joi.object({
  signalName: joi.string().alphanum().min(3).max(30).required(),
});

const schemaUpdateSignal = joi.object({
  signalName: joi.string().alphanum().min(3).max(30).required(),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});
module.exports = {
  schemaCreateSignal,
  schemaUpdateSignal,
  schemaIdQueryParams,
};
