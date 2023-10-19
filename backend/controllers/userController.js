const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const firebaseFn = require('../firebaseFunctions');

const User = require('../models/user');

// GET user profile JSON
exports.user_profile_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// GET signup view
exports.signup_get = asyncHandler(async (req, res, next) => {
  User.find({})
  .then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render('imagepage',{items: data})
  })
});

// POST signup form
exports.signup_post = asyncHandler(async (req, res, next) => {
  let avatarUrl = "https://firebasestorage.googleapis.com/v0/b/textera-e04fe.appspot.com/o/avatar-default.png?alt=media&token=e9d070f9-dfb7-48cf-a79f-ab9872776c4f";
  if (req.file) {
    avatarUrl = await firebaseFn.uploadFile(req.file.path, req.file.filename);
  }
  const user = {
    username: req.body.username,
    password: req.body.password,
    status: '',
    avatar: avatarUrl,
  }
  User.create(user)
  .then((err, item) => {
    if (err) {
      res.json(err)
    } else {
      item.save();
      res.end();
    }
  });
})

// GET login view
exports.login_get = asyncHandler(async (req, res, next) => {
  res.render('login');
})

// POST login
exports.login_post = asyncHandler(async (req, res, next) => {
  try {
    passport.authenticate ('local', {session: false}, (err, user, userData) => {
      if (err || !user) {
        const error = new Error('User does not exist')
        return res.status(403).json({
          userData
        })
      }
      req.login (user, {session: false}, (err) => {
        if (err){
          next(err);
        }
        const userInfo = { _id: user._id, username: user.username, role: user.role }
        return res.status(200).json({userInfo});
      });
    }) (req, res, next);
  } catch (err) {
    res.status(403).json({
      err
    })
  }
})