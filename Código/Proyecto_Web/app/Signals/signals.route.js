const signals = require("./signals.controller");
const router = require("express").Router();
const {
    validateIdQueryParam,
  validateBody,
} = require("../Core/validationRequest");
const {
  schemaCreateSignal,
  schemaUpdateSignal,
  schemaIdQueryParams,
} = require("./signals.schemas");
// Create a new Device
router.post("/", validateBody(schemaCreateSignal), signals.create);

// Retrieve all signals
router.get("/", signals.findAll);

// Retrieve a single Device with id
router.get("/:id", signals.findOne);

// Update a Device with id
router.put(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaUpdateSignal)],
  signals.update
);

// Delete a Device with id
router.delete("/:id", signals.delete);

module.exports = router;
