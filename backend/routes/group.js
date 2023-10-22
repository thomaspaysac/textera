const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/', groupController.get_group);

router.post('/create', groupController.create_group);

router.get('/:id', groupController.user_groups_get);

module.exports = router;