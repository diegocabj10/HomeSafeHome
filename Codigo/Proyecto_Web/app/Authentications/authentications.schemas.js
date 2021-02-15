const joi = require("joi");
const schemaLoginUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(3).max(30).required(),
});
module.exports = { schemaLoginUser };
