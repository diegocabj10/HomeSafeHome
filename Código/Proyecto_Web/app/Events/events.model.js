module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define('event', {
    date: {
      type: Sequelize.STRING
    },
    idOfSignal: {
      type: Sequelize.STRING
    },
    signal: {
      type: Sequelize.STRING
    },
    idOfDevice: {
      type: Sequelize.STRING
    },
    device: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    }
  });
  return Event;
};



