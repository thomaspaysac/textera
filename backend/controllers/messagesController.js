const asyncHandler = require("express-async-handler");
const firebaseFn = require('../firebaseFunctions');

const Message = require('../models/message')
const Conversation = require('../models/conversation')
const Group = require('../models/group');
const User = require('../models/user');

// GET all messages from one conversation
exports.conversation_messages_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ conversation: req.params.id })
    .sort({ createdAt: 1 })
    .populate('author', 'username');
  res.json(messages);
})

// GET all messages from one group
exports.group_messages_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ group: req.params.id })
    .sort({ createdAt: 1 })
    .populate('author', 'username');
  res.json(messages);
})

// POST message create
exports.message_create = asyncHandler(async (req, res, next) => {
  try {
    const message = new Message ({
    type: 'text',
    content: req.body.text_input,
    author: req.body.author,
    conversation: req.body.conversation,
  })
  if (req.file) {
    fileUrl = await firebaseFn.uploadFile(req.file.path, req.file.filename);
    message.file = fileUrl;
  }
  await message.save();
  /*if (!!req.body.conversation) {
    const conversation = await Conversation.findById(req.body.conversation);
    conversation.lastMessage = req.body.text_input;
    conversation.updatedAt = Date.now();
    await conversation.save();
  } else if (!!req.body.group) {
    const group = await Group.findById(req.body.group);
    group.lastMessage = req.body.author + ' : ' + req.body.text_input;
    group.updatedAt= Date.now();
    await group.save()
  }*/
  res.status(200)
  } catch {
    res.status(500)
  }
})