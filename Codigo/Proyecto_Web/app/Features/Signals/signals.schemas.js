const joi = require("joi");

const schemaIdQueryParams = joi.object().keys({
  id: joi.string().required(),
});
module.exports = {
  schemaIdQueryParams,
};
