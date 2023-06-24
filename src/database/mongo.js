const db = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger');
try {
  db.connect(config.DATABASE_URL, {
    authSource: config.DATABASE_AUTH_SOURCE,
    auth: {username: config.DATABASE_USER, password: config.DATABASE_PASSWORD},
  });
} catch (err) {
  logger.error(err);
}


module.exports = db;
