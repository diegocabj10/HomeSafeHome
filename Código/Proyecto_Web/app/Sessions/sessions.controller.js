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
