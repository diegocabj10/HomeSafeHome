const joi = require("joi");

const schemaCreateClaim = joi.object({
  title: joi.string().required(),
  message: joi.string().required(),
});

const schemaPatchClaim = joi.object({
  response: joi.string(),
});

const schemaUpdateClaim = joi.object({
  title: joi.string().required(),
  message: joi.string().required(),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});

module.exports = {
  schemaCreateClaim,
  schemaUpdateClaim,
  schemaPatchClaim,
  schemaIdQueryParams,
};
