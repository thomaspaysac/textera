const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: { type: String, required: true},
  //password: { type: String, required: true },
  status: { type: String, default: "Hey there, I'm on Textera!" },
  avatar : { type: String },
  contacts: { type: [mongoose.Schema.ObjectId], ref: 'User' },
}, {collation: { locale: 'en', strength: 1 } })

module.exports = mongoose.model('User', UserSchema);