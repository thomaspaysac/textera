const express = require('express');
const router = express.Router();
const convController = require('../controllers/conversationController');

router.get('/', convController.get_conv);

router.post('/create', convController.create_conv);

router.get('/user/:id', convController.user_conv_get);

router.get('/users/:user1/:user2', convController.get_conv_byUsers)

router.get('/:id', convController.get_convById);



module.exports = router;