const asyncHandler = require("express-async-handler");

const Message = require('../models/message')
const Conversation = require('../models/conversation')
const Group = require('../models/group');
const User = require('../models/user');

// test functions
exports.message_create = asyncHandler(async (req, res, next) => {
  const message = new Message ({
    type: 'text',
    content: 'Salut.',
    author: '6531038900a6fb5d566f0be2',
    conversation: '6533dd95088e5a560125a3c5'
  })
  await message.save();
  res.end();
})

// GET all messages from one conversation
exports.conversation_messages_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ conversation: req.params.id }).populate('author', 'username');
  res.json(messages);
})