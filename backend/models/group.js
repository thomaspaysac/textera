const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema ({
  users: { type: [mongoose.Schema.ObjectId], ref: 'User' },
  title: { type: String },
  admin: { type: mongoose.Schema.ObjectId, ref: 'User' },
  image: { type: String },
  lastMessage: { type: String },
},
{ 
  timestamps: true,
  toJSON: { virtuals: true }
});

GroupSchema.virtual('lastUpdate').get(function () {
  return this.updatedAt.toLocaleDateString();
})

GroupSchema.virtual('lastMessageFormatted').get(function () {
  if (this.lastMessage.length > 30) {
    return this.lastMessage.slice(0, 30) + '...';
  }
  return this.lastMessage
})


module.exports = mongoose.model('Group', GroupSchema);