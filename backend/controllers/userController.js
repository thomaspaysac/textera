require('dotenv').config();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require("express-validator");
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
exports.signup_post = [
  body('username', 'Username must contain at least 5 characters')
    .trim()
    .isLength({ min: 5 })
    .escape()
    .custom(async (value) => {
      const username = await User.find({ username: value }).exec();
      if (username.length) {
        throw new Error('This username is already in use')
      }
    }),
  body('password', 'Password must contain at least 5 characters')
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body('password_confirm')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Password confirm doesn\'t match')
      } else {
        return true;
      };
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      avatar: "https://firebasestorage.googleapis.com/v0/b/textera-e04fe.appspot.com/o/avatar-default.png?alt=media&token=e9d070f9-dfb7-48cf-a79f-ab9872776c4f",
    });
    if (!errors.isEmpty()) {
      res.json(errors.array());
      return;
    } else {
      res.json(errors.array());
      if (req.file) {
        avatarUrl = await firebaseFn.uploadFile(req.file.path, req.file.filename);
        user.avatar = avatarUrl;
      }
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          user.password = hashedPassword;
          await user.save();
          res.end();
        } catch(err) {
          return next(err);
        };
      })
    }
  })
]

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
        /*const token = jwt.sign(
          { _id: user._id, username: user.username, avatar: user.avatar },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );*/
        const userInfo = { _id: user._id, username: user.username, avatar: user.avatar }
        /*res.status(200).json({
          status: 200,
          userInfo,
          message: "login success",
          token: token,
        });*/
        return res.status(200).json({userInfo});
      });
    }) (req, res, next);
  } catch (err) {
    res.status(403).json({
      err
    })
  }
});

// Verify JWT
exports.verify_user = asyncHandler(async (req, res, next) => {
  console.log(req.token);
  res.end();
  /*jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) =>{
    if (err) {
      res.status(403);
    } else {
      res.json({
        message: 'Authorized',
        authData
      }
        );
    }
  })*/
});