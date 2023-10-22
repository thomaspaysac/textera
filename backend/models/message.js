const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
  type: { type: String, enum: ['text', 'file'] },
  content: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  conversation: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  group: { type: Schema.Types.ObjectId, ref: 'Group' }
},
{ 
  timestamps: true,
  toJSON: { virtuals: true }
});

MessageSchema.virtual('timestampFormatted').get(function () {
  return this.createdAt.toLocaleDateString();
})

module.exports = mongoose.model('Message', MessageSchema);