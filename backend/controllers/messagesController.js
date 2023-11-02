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

// GET all media from one conversation
exports.conversation_media_get = asyncHandler(async (req, res, next) => {
  const media = await Message.find({ conversation: req.params.id, file: {$exists: true} });
  res.json(media);
})

// GET all messages from one group
exports.group_messages_get = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Message.find({ group: req.params.id })
    .sort({ createdAt: 1 })
    .populate('author', 'username avatar');
    res.json(messages);
  } catch {
    res.sendStatus(404);
  }
})

// GET all media from one group
exports.group_media_get = asyncHandler(async (req, res, next) => {
  const media = await Message.find({ group: req.params.id, file: {$exists: true} });
  res.json(media);
})

// POST message create
exports.message_create = asyncHandler(async (req, res, next) => {
  try {
    const message = new Message ({
      type: 'text',
      content: req.body.text_input,
      author: req.body.author,
    })
    if (!!req.body.conversation) {
      message.conversation = req.body.conversation;
    } else if (!!req.body.group) {
      message.group = req.body.group;
    }
    if (req.file) {
      const filetypeCheck = /(gif|jpe?g|tiff?|png|webp|bmp)$/i
      if (filetypeCheck.test(req.file.mimetype)) {
        fileUrl = await firebaseFn.uploadFile(req.file.path, req.file.filename);
        message.file = fileUrl;  
        await message.save();
        res.status(200)
      } else {
        const err = 'You can only send image files.'
        res.status(500).json(err);
      }
    } else {
      await message.save();
    }
    // update conversation / group
    if (!!req.body.conversation) {
      const conversation = await Conversation.findById(req.body.conversation);
      conversation.lastMessage = req.body.text_input;
      conversation.updatedAt = Date.now();
      await conversation.save();
      res.status(200)
    } else if (!!req.body.group) {
      const group = await Group.findById(req.body.group);
      const user = await User.findById(req.body.author);
      group.lastMessage = user.username + ': ' + req.body.text_input;
      group.updatedAt= Date.now();
      await group.save();
      res.status(200)
    }
  } catch {
    res.status(500)
  }
})