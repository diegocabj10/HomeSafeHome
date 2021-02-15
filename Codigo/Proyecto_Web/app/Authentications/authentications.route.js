const authentications = require("./authentications.controller");
const router = require("express").Router();
const { validateBody } = require("../Core/validationRequest");
const { schemaLoginUser } = require("./authentications.schemas");

// login a user
router.post("/login", validateBody(schemaLoginUser), authentications.login);

module.exports = router;
