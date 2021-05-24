const joi = require("joi");

const schemaCreateDevice = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
});

const schemaUpdateDevice = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});
module.exports = {
  schemaCreateDevice,
  schemaUpdateDevice,
  schemaIdQueryParams,
};
