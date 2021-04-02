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

// Retrieve all signals
router.get("/", signals.findAll);

// Retrieve a single Device with id
router.get("/:id", signals.findOne);

module.exports = router;
