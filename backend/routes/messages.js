const express = require('express');
const router = express.Router();
const multer = require('multer');
const messagesController = require('../controllers/messagesController');

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/create', upload.single('file_upload'), messagesController.message_create);

router.get('/conv/:id', messagesController.conversation_messages_get);

router.get('/conv/:id/media', messagesController.conversation_media_get);

router.get('/group/:id', messagesController.group_messages_get);

router.get('/group/:id/media', messagesController.group_media_get);

module.exports = router;