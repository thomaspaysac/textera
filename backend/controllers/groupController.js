const asyncHandler = require("express-async-handler");
const firebaseFn = require('../firebaseFunctions');

const Group = require('../models/group');
const User = require('../models/user');


// GET One user's groups // SECURED
exports.user_groups_get = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization !== req.params.id) {
    res.sendStatus(403)
  } else {
    const groups = await Group.find({ users: req.params.id })
    .sort({ updatedAt: -1 });
    res.status(200).json(groups);
  }
})


// GET Group by ID // SECURED
exports.get_groupById = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id).populate('users', 'username avatar').populate('admin', 'username avatar');
  if (!group) {
    res.sendStatus(404);
  }
  const usersIds = [];
  group.users.forEach((el) => usersIds.push(el._id.toString()))
  if (usersIds.includes(req.headers.authorization)) {
    res.json(group);
  } else {
    res.sendStatus(403);
  }
})


// POST Create group
exports.create_group = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  /*const group = new Group({
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
  res.status(200);*/
})


// POST Edit group
exports.edit_group = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  //const group = await Group.findById(req.params.id);
})


/*
TEST FUNCTIONS

GET All groups
exports.get_group = asyncHandler(async (req, res, next) => {
  const group = await Group.find().populate('users', 'username').populate('admin', 'username');
  res.json(group);
})
*/
