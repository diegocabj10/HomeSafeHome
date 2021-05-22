const notificationSettingModel = require("./notificationsSettings.model");

exports.findValuesFromAndTo = async (signalId) => {
  const valuesFromAndTo = await notificationSettingModel.findAll({
    raw: true,
    where: { signalId: signalId },
  });
  return valuesFromAndTo;
};
