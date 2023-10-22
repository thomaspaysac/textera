const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema ({
  users: { type: [mongoose.Schema.ObjectId], ref: 'User' },
  title: { type: String },
  admin: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Group', GroupSchema);