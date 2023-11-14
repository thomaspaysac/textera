const express = require('express');
const router = express.Router();
const multer = require('../multer');
const groupController = require('../controllers/groupController');

//router.get('/', groupController.get_group);

router.post('/create', multer.upload.single('image'), groupController.create_group);

router.get('/user/:id', groupController.user_groups_get);

router.post('/edit/:id', groupController.edit_group);

router.get('/:id', groupController.get_groupById);

module.exports = router;