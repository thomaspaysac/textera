const express = require('express');
const router = express.Router();
const convController = require('../controllers/conversationController');

router.get('/', convController.get_conv);


router.post('/create', convController.create_conv);

router.get('/:id', convController.user_conv_get);


module.exports = router;