const jwt = require("jsonwebtoken");

//Login an user
const login = async (req, res) => {
  //use the payload to store information about the user such as username, user role, etc.
  const { email, password } = req.body;
  const payload = req.body;
  //create the access token with the shorter lifespan
  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  //create the refresh token with the longer lifespan
  let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  //store the refresh token...
  res.cookie("jwt", accessToken);
  res.send();
};

const refresh = async (req, res) => {
  let accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(403).send();
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (e) {
    return res.status(401).send();
  }

  //retrieve the refresh token from the DB...
  // let refreshToken = ''

  //verify the refresh token
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (e) {
    return res.status(401).send();
  }

  let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  res.cookie("jwt", newToken, { secure: true, httpOnly: true });
  res.send();
};

module.exports = { login };
