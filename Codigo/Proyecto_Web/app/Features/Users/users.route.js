const users = require("./users.controller");
const router = require("express").Router();
const {
  validateIdQueryParam,
  validateBody,
} = require("../../Shared/validationRequest");
const {
  schemaCreateUser,
  schemaUpdateUser,
  schemaIdQueryParams,
} = require("./users.schemas");

// Create a new user
router.post("/", validateBody(schemaCreateUser), users.create);

// Retrieve all users
router.get("/", users.findAll);

// Retrieve a single user with id
router.get("/:id", users.findOne);

// Update a user with id
router.put(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaUpdateUser)],
  users.update
);

// Delete a user with id
router.delete("/:id", users.delete);

module.exports = router;
