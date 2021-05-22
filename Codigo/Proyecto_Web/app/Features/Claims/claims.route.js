const claims = require("./claims.controller");
const router = require("express").Router();
const {
  validateIdQueryParam,
  validateBody,
} = require("../../Shared/validationRequest");
const {
  schemaCreateClaim,
  schemaUpdateClaim,
  schemaPatchClaim,
  schemaIdQueryParams,
} = require("./claims.schemas");

// Create a new claim
router.post("/", validateBody(schemaCreateClaim), claims.create);

// Update a claim with id
router.put(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaUpdateClaim)],
  claims.put
);

// Retrieve all claims
router.get("/", claims.findAll);

// Retrieve a single claim with id
router.get("/:id", claims.findOne);

// Delete a claim with id
router.delete("/:id", claims.delete);

// Patch a claim with id
router.patch(
  "/:id",
  [validateIdQueryParam(schemaIdQueryParams), validateBody(schemaPatchClaim)],
  claims.patch
);





module.exports = router;
