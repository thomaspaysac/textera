const asyncHandler = require("express-async-handler");

const Message = require('../models/message')
const Conversation = require('../models/conversation')
const Group = require('../models/group');
const User = require('../models/user');

// test functions
exports.message_create = asyncHandler(async (req, res, next) => {
  const message = new Message ({
    type: 'text',
    content: 'Salut, ceci est un test de message.',
    author: '653103fee34793b9b2491f19',
    conversation: '6533dd95088e5a560125a3c5'
  })
  await message.save();
  res.status(200);
})
