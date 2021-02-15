const usersDevicesModel = require("./usersDevices.model");

const findUserIdfromDeviceId = async (deviceId) => {
  const userDevice = await usersDevicesModel.findOne({
    raw: true,
    where: { userId: deviceId },
  });
  return userDevice;
};

module.exports = findUserIdfromDeviceId;
