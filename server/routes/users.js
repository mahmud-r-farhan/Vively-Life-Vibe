const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

router.post('/', upload.single('profilePicture'), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/username/:username', userController.getUserByUsername);
router.put('/:id', upload.single('profilePicture'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;