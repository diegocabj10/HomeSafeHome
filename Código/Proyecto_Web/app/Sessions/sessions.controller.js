const db = require("../../config/db.config");
const sessionsModel = require("./sessions.model");

// Create and save a new session
exports.createSession = async (userId, refreshToken) => {
  try {
    // Create and save session
    const newSession = await sessionsModel.create({
      userId: userId,
      refreshToken: refreshToken,
    });
    return newSession;
  } catch (err) {
    return err;
  }
};

exports.validateRefreshTokenExist = async (userId, refreshToken) => {
  try {
    const refreshTokenExist = await sessionsModel.findOne({
      where: { userId, refreshToken },
    });
    return refreshTokenExist.dataValues;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
