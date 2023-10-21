const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
  type: { type: String },
  content: { type: String, enum: ['text', 'file'] },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  conversation: { type: Schema.Types.ObjectId, ref: 'Conversation' },
},
{ 
  timestamps: true,
  toJSON: { virtuals: true }
});

MessageSchema.virtual('timestampFormatted').get(function () {
  return this.createdAt.toLocaleDateString();
})

module.exports = mongoose.model('Message', MessageSchema);