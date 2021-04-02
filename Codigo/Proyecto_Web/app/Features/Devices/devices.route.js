const router = require("express").Router();
const devices = require("./devices.controller");
const {
  validateIdQueryParam,
  validateBody,
} = require("../../Shared/validationRequest");
const {
  schemaCreateDevice,
  schemaUpdateDevice,
  schemaIdQueryParams,
} = require("./devices.schemas");

// Create a new Device
router.post("/", validateBody(schemaCreateDevice), devices.create);

// Retrieve all Devices
router.get("/", devices.findAll);

// Retrieve a single Device with id
router.get("/:id", devices.findOne);

// Update a Device with id
router.put(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaUpdateDevice)],
  devices.update
);

// Delete a Device with id
router.delete("/:id", devices.delete);

module.exports = router;
