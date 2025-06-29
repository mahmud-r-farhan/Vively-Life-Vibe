const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');

exports.register = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, contact, bio } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(409).json({ message: 'Username or email already exists' });

    let profilePicture = 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=No+Image';
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'devplus_users', public_id: `user_${Date.now()}` },
        (error, result) => {
          if (error) throw new Error('Cloudinary upload failed.');
          return result.secure_url;
        }
      ).end(req.file.buffer);
      profilePicture = result.secure_url;
    }

    const user = new User({ username, firstName, lastName, email, password, contact, bio, profilePicture });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }
};
