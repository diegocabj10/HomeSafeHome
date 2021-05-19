const joi = require("joi");

const schemaCreateClaim = joi.object({
  title: joi.string().required(),
  message: joi.string().required(),
});

const schemaUpdateClaim = joi.object({
  response: joi.string(),
});

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});

module.exports = {
  schemaCreateClaim,
  schemaUpdateClaim,
  schemaIdQueryParams,
};
