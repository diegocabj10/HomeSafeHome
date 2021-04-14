const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const payload = jwt.verify(req.headers['x-access-token'], process.env.ACCESS_TOKEN_SECRET);
    req.body.userId = payload.userLogged.id;
    next();
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

module.exports = { authenticate };
