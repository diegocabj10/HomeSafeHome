const events = require("./events.controller");
const router = require("express").Router();
const { validateBody } = require("../Core/validationRequest");
const { schemaCreateEvent } = require("./events.schemas");
// Create a new Event
router.post("/", validateBody(schemaCreateClaim), events.create);

module.exports = router;
