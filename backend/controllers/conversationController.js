const asyncHandler = require("express-async-handler");

const Conversation = require('../models/conversation');
const User = require('../models/user');

// GET all user's conversations
exports.user_conv_get = asyncHandler(async (req, res, next) => {
  const conv = await Conversation.find({ users: req.params.id }).populate('users', 'username avatar');
  res.json(conv);
})

// GET conversation by ID
exports.get_convById = asyncHandler(async (req, res, next) => {
  const conv = await Conversation.findById(req.params.id).populate('users', 'username avatar');
  res.json(conv);
})

// test functions
exports.create_conv = asyncHandler(async (req, res, next) => {
  const users = [];
  const user1 = await User.findById('65318e150d029949f5b5b1b9');
  const user2 = await User.findById('653103fee34793b9b2491f19');
  users.push(user1);
  users.push(user2);
  const conversation = new Conversation({
    users: users,
  })
  await conversation.save();
  res.end;
})

exports.get_conv = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.find().populate('users', 'username');
  res.json(conversation);
})

