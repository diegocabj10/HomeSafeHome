
const jwt = require('jsonwebtoken');
//Login an user
const login = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).send({
            message: 'Debe ingresar email y password'
        });
    }

    //use the payload to store information about the user such as username, user role, etc.
    let payload = { username: username }

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });

    //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    });

    //store the refresh token...

    res.cookie('jwt', accessToken)
    res.send(accessToken);

}

const refresh = async (req, res) => {

    let accessToken = req.cookies.jwt

    if (!accessToken) {
        return res.status(403).send()
    }

    let payload
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    }
    catch (e) {
        return res.status(401).send()
    }

    //retrieve the refresh token from the DB...
    // let refreshToken = ''

    //verify the refresh token
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch (e) {
        return res.status(401).send()
    }

    let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

    res.cookie("jwt", newToken, { secure: true, httpOnly: true })
    res.send()
}

const authenticate = async (req, res, next) => {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        return res.status(403).send(req.cookies);
    }
    let payload;
    try {
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = { login, authenticate };