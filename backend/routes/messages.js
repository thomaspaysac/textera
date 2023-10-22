const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/create', messagesController.message_create);

router.get('/conv/:id', messagesController.conversation_messages_get);

module.exports = router;