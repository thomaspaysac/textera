const asyncHandler = require("express-async-handler");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const firebaseFn = require('../firebaseFunctions');

exports.user_profile_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

exports.signup_get = asyncHandler(async (req, res, next) => {
  User.find({})
  .then((data, err) => {
    if (err) {
      console.log(err);
    }
    res.render('imagepage',{items: data})
  })
});

exports.signup_post = asyncHandler(async (req, res, next) => {
  let avatarUrl = "https://firebasestorage.googleapis.com/v0/b/textera-e04fe.appspot.com/o/avatar-default.png?alt=media&token=e9d070f9-dfb7-48cf-a79f-ab9872776c4f";
  if (req.file) {
    avatarUrl = await firebaseFn.uploadFile(req.file.path, req.file.filename);
  }
  const user = {
    name: req.body.name,
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

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render('login');
})

exports.login_post = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  res.end();
})