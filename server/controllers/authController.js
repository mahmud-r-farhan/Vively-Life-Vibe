const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { uploadToCloudinary } = require('../utils/cloudinaryUtils');
const ApiError = require('../utils/ApiError');

exports.register = async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password, contact, bio } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ApiError(409, 'Username or email already exists');
    }

    let profilePicture = 'https://placehold.co/400x400/EFEFEF/AAAAAA?text=No+Image';
    if (req.file) {
      profilePicture = await uploadToCloudinary(req.file);
    }

    const user = new User({ username, firstName, lastName, email, password, contact, bio, profilePicture });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
};