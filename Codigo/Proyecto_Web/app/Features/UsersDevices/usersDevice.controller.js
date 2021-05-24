const usersDevicesModel = require("./usersDevices.model");

exports.findOwnerUserIdfromDeviceId = async (deviceId) => {
  const userDevice = await usersDevicesModel.findOne({
    raw: true,
    where: { deviceId: deviceId },
  });
  return userDevice;
};