const asyncHandler = require("express-async-handler");
const firebaseFn = require('../firebaseFunctions');

const Group = require('../models/group');
const User = require('../models/user');

// GET user's groups
exports.user_groups_get = asyncHandler(async (req, res, next) => {
  const groups = await Group.find({ users: req.params.id })
    .sort({ updatedAt: -1 });
  res.json(groups);
})

// GET group by ID
exports.get_groupById = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id).populate('users', 'username avatar').populate('admin', 'username avatar');
  if (!group) {
    res.sendStatus(404);
  } else {
    res.json(group);
  }
})


// test functions
exports.create_group = asyncHandler(async (req, res, next) => {
  const group = new Group({
    title: req.body.title,
    users: req.body.users,
    admin: req.body.admin,
    lastMessage: '',
    image: 'https://firebasestorage.googleapis.com/v0/b/textera-e04fe.appspot.com/o/group-default.png?alt=media&token=074d0f53-c338-4c29-9b30-26271ca4affd',
  });
  if (req.file) {
    const filetypeCheck = /(gif|jpe?g|tiff?|png|webp|bmp)$/i
    if (filetypeCheck.test(req.file.mimetype)) {
      imageUrl = await firebaseFn.uploadFile(req.file.path, req.file.filename);
      group.image = imageUrl;
    }
  }
  await group.save();
  res.json(group._id);
  res.status(200);
})

exports.get_group = asyncHandler(async (req, res, next) => {
  const group = await Group.find().populate('users', 'username').populate('admin', 'username');
  res.json(group);
})

