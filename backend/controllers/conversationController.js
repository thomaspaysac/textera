const asyncHandler = require("express-async-handler");

const Conversation = require('../models/conversation');
const User = require('../models/user');

// GET all user's conversations
exports.user_conv_get = asyncHandler(async (req, res, next) => {
  const conv = await Conversation.find({ users: req.params.id })
    .sort({ updatedAt: -1 })
    .populate('users', 'username avatar');
  res.json(conv);
})

// GET conversation by ID
exports.get_convById = asyncHandler(async (req, res, next) => {
  const conv = await Conversation.findById(req.params.id).populate('users', 'username avatar');
  res.json(conv);
})

// GET conversation by users
exports.get_conv_byUsers = asyncHandler(async (req, res, next) => {
  const conv = await Conversation.find({users: { $all: [req.params.user1, req.params.user2] }});
  res.json(conv);
})

// test functions
exports.create_conv = asyncHandler(async (req, res, next) => {
  const users = [];
  const user1 = await User.findById(req.body.user1);
  const user2 = await User.findById(req.body.user2);
  users.push(user1);
  users.push(user2);
  const conversation = new Conversation({
    users: users,
    lastMessage: '',
  })
  await conversation.save();
  res.status(200);
})

exports.get_conv = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.find().populate('users', 'username');
  res.json(conversation);
})

