const router = require("express").Router();
const authentications = require("./authentications.controller");
const { schemaLoginUser } = require("./authentications.schemas");
const { validateBody } = require("../../Shared/validationRequest");

// login a user
router.post("/login", validateBody(schemaLoginUser), authentications.login);

module.exports = router;
