const db = require('../database/mongo');

const profile = db.model('profile', {
  name: String,
  age: Number,
  email: String,
  dateofbirth: Date,
  bio: String,
  profilepicture: String,
  username: String,
});

module.exports = profile;
