const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema ({
  users: { type: [mongoose.Schema.ObjectId], ref: 'User' },
  lastMessage: { type: String },
},
{ 
  timestamps: true,
  toJSON: { virtuals: true }
});

ConversationSchema.virtual('lastUpdate').get(function () {
  return this.updatedAt.toLocaleDateString();
})

ConversationSchema.virtual('lastMessageFormatted').get(function () {
  if (this.lastMessage.length > 30) {
    return this.lastMessage.slice(0, 30) + '...';
  }
  return this.lastMessage
})

module.exports = mongoose.model('Conversation', ConversationSchema);