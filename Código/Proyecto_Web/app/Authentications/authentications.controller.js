const jwt = require("jsonwebtoken");
const { validateUserExist } = require("../Users/users.controller");
const { createSession } = require("../Sessions/sessions.controller");
//Login an user
const login = async (req, res) => {
  try {
    const userExist = await validateUserExist(req, res);

    const payload = userExist;

    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    const refreshedtoken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const session = await createSession(userExist.id, refreshToken);

    res.cookie("acessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    res.send();
  } catch (error) {
    return res.status(401).send(err);
  }
};

const refresh = async (req, res) => {
  let accessToken = req.cookies.jwt;
  let refreshToken = req.cookies.jwt;

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
  } catch (err) {
    return res.status(401).send(err);
  }

  let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  res.cookie("jwt", newToken, { secure: true, httpOnly: true });
  res.send();
};

module.exports = { login };
