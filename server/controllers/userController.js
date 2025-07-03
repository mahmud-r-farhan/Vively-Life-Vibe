const User = require('../models/User');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUtils');
const ApiError = require('../utils/ApiError');
const cloudinary = require('cloudinary').v2;

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password -__v');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) throw new ApiError(404, 'User not found');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password -__v');
    if (!user) throw new ApiError(404, 'User not found');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, 'User not found');

    let profilePicture = req.body.profilePicture || user.profilePicture;
    let oldPublicId = null;

    if (req.file) {
      // Extract public_id from existing profilePicture if it's a Cloudinary URL
      if (user.profilePicture && !user.profilePicture.includes('placehold.co')) {
        const publicId = user.profilePicture.split('/').pop().split('.')[0];
        oldPublicId = `devplus_users/${publicId}`;
      }
      profilePicture = await uploadToCloudinary(req.file);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profilePicture },
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (oldPublicId) {
      await deleteFromCloudinary(oldPublicId);
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, 'User not found');

    // Delete profile picture from Cloudinary if it's not the default
    if (user.profilePicture && !user.profilePicture.includes('placehold.co')) {
      const publicId = user.profilePicture.split('/').pop().split('.')[0];
      await deleteFromCloudinary(`devplus_users/${publicId}`);
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};