const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const { validateUser, validateRequest } = require('../utils/validators');

// Admin routes (assumes authMiddleware checks for admin role)
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.get('/username/:username', authMiddleware, getUserByUsername);
router.put('/:id', authMiddleware, upload.single('profilePicture'), validateUser, validateRequest, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;