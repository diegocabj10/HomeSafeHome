const joi = require("joi");

const schemaCreateContact = joi.object({
    email: joi.string().email().required(),
    phone: joi.string().required(),
    name: joi.string().alphanum().min(3).max(500).required(),
    lastName: joi.string().alphanum().min(3).max(500).required(),
});

const schemaUpdateContact = joi.object({
    email: joi.string().email().required(),
    phone: joi.string().required(),
    name: joi.string().alphanum().min(3).max(500).required(),
    lastName: joi.string().alphanum().min(3).max(500).required(),
});

const schemaIdQueryParams = joi.object().keys({
    id: joi.string().required(),
});

module.exports = {
    schemaCreateContact,
    schemaUpdateContact,
    schemaIdQueryParams,
};
