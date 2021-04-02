const joi = require("joi");

const schemaCreateNotice = joi.object({
  title: joi.string().alphanum().min(3).max(30).required(),
  message: joi.string().alphanum().min(3).max(30).required(),
  response: joi.string().alphanum().min(3).max(500).required(),
});

const schemaUpdateNotice = joi.object({
  title: joi.string().alphanum().min(3).max(30).required(),
  message: joi.string().alphanum().min(3).max(30).required(),
  claimResponse: joi.string().alphanum().min(3).max(500).required(),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});

module.exports = {
  schemaCreateNotice,
  schemaUpdateNotice,
  schemaIdQueryParams,
};
