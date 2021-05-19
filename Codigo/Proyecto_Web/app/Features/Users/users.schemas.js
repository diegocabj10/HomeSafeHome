const joi = require("joi");

const schemaCreateUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(3).max(30).required(),
  name: joi.string().alphanum().min(3).max(500).required(),
  lastName: joi.string().alphanum().min(3).max(500).required(),
});

const schemaUpdateUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(3).max(30).required(),
  name: joi.string().alphanum().min(3).max(500).required(),
  lastName: joi.string().alphanum().min(3).max(500).required(),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});

module.exports = {
  schemaCreateUser,
  schemaUpdateUser,
  schemaIdQueryParams,
};
