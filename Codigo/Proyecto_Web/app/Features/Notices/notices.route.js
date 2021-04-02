const notices = require("./notices.controller");
const router = require("express").Router();
const {
  validateIdQueryParam,
  validateBody,
} = require("../../Shared/validationRequest");
const {
  schemaCreateNotice,
  schemaUpdateNotice,
  schemaIdQueryParams,
} = require("./notices.schemas");

// Create a new user
router.post("/", validateBody(schemaCreateNotice), notices.create);

// Retrieve all notices
router.get("/", notices.findAll);

// Retrieve a single user with id
router.get("/:id", notices.findOne);

// Update a user with id
router.put(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaUpdateNotice)],
  notices.update
);

// Delete a user with id
router.delete("/:id", notices.delete);

module.exports = router;
