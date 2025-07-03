const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const upload = require('../middleware/upload');
const { validateUser, validateRequest } = require('../utils/validators');

router.post('/register', upload.single('profilePicture'), validateUser, validateRequest, register);
router.post('/login', login);

module.exports = router;