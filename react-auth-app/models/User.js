const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  gender: String,
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
