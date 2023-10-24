const asyncHandler = require("express-async-handler");
const firebaseFn = require('../firebaseFunctions');

const Message = require('../models/message')
const Conversation = require('../models/conversation')
const Group = require('../models/group');
const User = require('../models/user');

// test functions
exports.message_create = asyncHandler(async (req, res, next) => {
  console.log(req.body, req.file);
  try {
    const message = new Message ({
    type: 'text',
    content: req.body.text_input,
    author: req.body.author,
    conversation: req.body.conversation
  })
  if (req.file) {
    fileUrl = await firebaseFn.uploadFile(req.file.path, req.file.filename);
    message.file = fileUrl;
  }
  await message.save();
  res.status(200)
  } catch {
    res.status(500)
  }
})

// GET all messages from one conversation
exports.conversation_messages_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ conversation: req.params.id }).populate('author', 'username');
  res.json(messages);
})