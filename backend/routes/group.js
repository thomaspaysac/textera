const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/', groupController.get_group);

router.post('/create', groupController.create_group);

router.get('/user/:id', groupController.user_groups_get);

router.get('/:id', groupController.get_groupById);

module.exports = router;