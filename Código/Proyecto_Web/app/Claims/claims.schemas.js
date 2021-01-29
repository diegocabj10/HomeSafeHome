const joi = require("joi");

const schemaCreateClaim = joi.object({
  title: joi.string().required(),
  message: joi.string().required(),
  userId: joi.number().min(0).required(),
});

const schemaUpdateClaim = joi.object({
  title: joi.string(),
  message: joi.string(),
  response: joi.string(),
  userId: joi.number().min(0),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});

module.exports = {
  schemaCreateClaim,
  schemaUpdateClaim,
  schemaIdQueryParams,
};
