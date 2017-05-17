var error = winston.loggers.get('error');
var info = winston.loggers.get('info');

module.exports = {
  debug: function (message) {
    debug.debug(message);
  },

  error: function (message) {
    error.error(message)
  },

  info: function (message) {
    info.info(message);
  }
}