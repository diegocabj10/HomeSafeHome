const claims = require("./claims.controller");
const router = require("express").Router();
const {
  validateIdQueryParam,
  validateBody,
} = require("../../Shared/validationRequest");
const {
  schemaCreateClaim,
  schemaUpdateClaim,
  schemaIdQueryParams,
} = require("./claims.schemas");

// Create a new claim
router.post("/", validateBody(schemaCreateClaim), claims.create);

// Retrieve all claims
router.get("/", claims.findAll);

// Retrieve a single claim with id
router.get("/:id", claims.findOne);

// Update a claim with id
router.put(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaUpdateClaim)],
  claims.update
);

// Delete a claim with id
router.delete("/:id", claims.delete);

module.exports = router;
