const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.body.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
};

module.exports = { authenticate };
