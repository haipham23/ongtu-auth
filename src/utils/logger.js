const winston = require('winston');

const isDebug = process.env.LOG_LEVEL === 'debug';
const isProd = process.env.NODE_ENV === 'production';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: isDebug ? 'debug' : 'info',
      colorize: true,
      json: isProd,
      stringify: isProd,
      timestamp: true
    })
  ]
});

module.exports = logger;
