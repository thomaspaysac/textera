const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: "Hey there, I'm on Textera!" },
  avatar : { type: String },
  loggedIn: { Boolean },
})

module.exports = mongoose.model('User', UserSchema);