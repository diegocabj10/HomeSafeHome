const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
   
    try {
      //use the jwt.verify method to verify the access token
      //throws an error if the token has expired or has a invalid signature
      const payload = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (err) {
      return res.status(401).send(err);
    }
  };

  module.exports = { authenticate };
