const contacts = require("./contacts.controller");
const router = require("express").Router();
const {
  validateIdQueryParam,
  validateBody,
} = require("../../Shared/validationRequest");
const {
  schemaCreateContact,
  schemaUpdateContact,
  schemaIdQueryParams,
} = require("./contacts.schemas");

// Create a new contact
router.post("/", validateBody(schemaCreateContact), contacts.create);

// Retrieve all contacts
router.get("/", contacts.findAll);

// Retrieve a single contact with id
router.get("/:id", contacts.findOne);

// Update a contact with id
router.put(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaUpdateContact)],
  contacts.put
);

// Delete a contact with id
router.delete("/:id", contacts.delete);

module.exports = router;
