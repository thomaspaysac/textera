const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema ({
  users: { type: [mongoose.Schema.ObjectId], ref: 'User' },
  //users: { type: Array },
  type: { type: String, enum: ['single', 'group'] }
})

module.exports = mongoose.model('Conversation', ConversationSchema);