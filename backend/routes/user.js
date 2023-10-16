const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

router.get('/signup', userController.signup_get);

router.post('/signup', upload.single('avatar'), userController.signup_post);

router.get('/:id', userController.user_profile_get);



module.exports = router;
