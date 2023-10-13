var express = require('express');
var router = express.Router();

const message = {
  author: 'TestAuthor',
  text: 'TestText',
  timestamp: 'today'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.json(message)
})

module.exports = router;
