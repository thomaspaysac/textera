const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
