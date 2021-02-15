const joi = require("joi");

const schemaCreateDevice = joi.object({
  deviceName: joi.string().alphanum().min(3).max(30).required(),
});

const schemaUpdateDevice = joi.object({
  deviceName: joi.string().alphanum().min(3).max(30).required(),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});
module.exports = {
  schemaCreateDevice,
  schemaUpdateDevice,
  schemaIdQueryParams,
};
