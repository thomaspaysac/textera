const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fs = require('fs');
const asyncHandler = require("express-async-handler");
const userSchema = require('../models/user');

const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });



/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  res.send('user page');
  })
)

router.get('/upload', asyncHandler(async (req, res, next) => {
  userSchema.find({})
    .then((data, err) => {
      if (err) {
        console.log(err);
      }
      res.render('imagepage',{items: data})
    })
  })
)

/*router.post('/upload', upload.single('avatar'), asyncHandler(async (req, res, next) => {
  const obj = {
    name: req.body.name,
    password: req.body.password,
    status: req.body.status,
    avatar: {
      data: fs.readFileSync(path.join('../uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  }
  userSchema.create(obj)
    .then((err, item) => {
      if (err) {
        console.log(err);
      } else {
        item.save();
        res.redirect('/');
      }
    });
  })
);*/


module.exports = router;
