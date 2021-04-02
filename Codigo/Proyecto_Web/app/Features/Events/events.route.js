const events = require("./events.controller");
const router = require("express").Router();
const { validateBody } = require("../../Shared/validationRequest"); const { schemaCreateEvent } = require("./events.schemas");
// Create a new Event
router.post("/", validateBody(schemaCreateEvent), events.create);

module.exports = router;
