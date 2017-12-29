const config = require('../config');

module.exports = {
  active: config.LOGS_ACTIVE,

  log(...message) {
    if (!config.LOGS_ACTIVE) { return false; }

    try {
      console.log(...message);
      return true;
    } catch (reason) {
      console.error(reason);
      return false;
    }
  },

  error(...message) {
    if (!config.LOGS_ACTIVE) { return false; }

    try {
      console.error(...message);
      return true;
    } catch (reason) {
      console.error(reason);
      return false;
    }
  }
};
