const asyncHandler = require("express-async-handler");

const Conversation = require('../models/conversation');
const User = require('../models/user');

// TEST function
exports.create_conv = asyncHandler(async (req, res, next) => {
  const users = [];
  const user1 = await User.findById('6531038900a6fb5d566f0be2').populate('username').exec();
  const user2 = await User.findById('653103fee34793b9b2491f19').exec();
  users.push(user1);
  users.push(user2);
  const conversation = new Conversation({
    users: users,
    type: 'single',
  })
  await conversation.save();
  res.end;
})

// GET conversation
exports.get_conv = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findById('6533dd95088e5a560125a3c5').populate('users').exec();
  res.json(conversation);
})