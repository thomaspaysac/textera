const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String },
  avatar : { data: Buffer, contentType: String },
})

module.exports = mongoose.model('User', UserSchema);