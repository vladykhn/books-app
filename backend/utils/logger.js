const Debug = require('debug');

const logger = {
  info: Debug('backend: info'),
  error: Debug('backend: error'),
};

module.exports = {
  logger,
};
