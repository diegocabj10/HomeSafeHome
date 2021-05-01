const jwt = require('jsonwebtoken');
const { validateUserExist } = require('../../Features/Users/users.controller');
const {
  createSession,
  validateRefreshTokenExist,
} = require('../../Features/Sessions/sessions.controller');
//Login an user
const login = async (req, res) => {
  try {
    const userExist = await validateUserExist(req, res);

    const payload = userExist;

    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    const session = await createSession(userExist.id, refreshToken);

    res.set({
      'x-access-token': accessToken,
      'x-refresh-token': refreshToken
    });

    res.send({
      message:
        'Successfully authenticated. The accessToken and refreshToken are returned in two headers name x-access-token and x-refresh-token.'
    });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

const refresh = async (req, res) => {
  let accessToken = req.headers['x-access-token'];
  let refreshToken = req.headers['x-refresh-token'];

  if (!accessToken || !refreshToken) {
    return res.status(403).send();
  }

  try {
    const payloadAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const payloadRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (err) {
    res.status(401).send({ message: err.message });
  }

  //retrieve the refresh token from the DB...
  // let refreshToken = ''
  const refreshTokenExist = await validateRefreshTokenExist(
    payloadRefreshToken.id,
    refreshToken
  );

  if (!refreshTokenExist) return res.status(404).send('Refresh token does not exist');

  let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  res.set({
    'x-access-token': accessToken,
    'x-refresh-token': refreshToken
  });
  res.send();
};

module.exports = { login };
