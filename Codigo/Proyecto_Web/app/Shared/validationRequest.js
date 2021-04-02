const validateIdQueryParam = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
      return;
    }
    next();
  };
};
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
      return;
    }
    next();
  };
};
module.exports = { validateIdQueryParam, validateBody };