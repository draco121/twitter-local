const db = require('../database/mongo');

const network = db.model('network', {
  username: String,
  followers: [String],
  following: [String],
  sentrequests: [String],
  recivedrequests: [String],
});

module.exports = network;
