const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

exports.createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ 
            $or: [{ username: req.body.username }, { email: req.body.email }] 
        });
        if (existingUser) return res.status(409).json({ message: 'Username or email already in use.' });

        let profilePicture = req.body.profilePicture || 'https://placehold.co/400x400/EFEFEF/AAAAAA?text=No+Image';

        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'devplus_users', public_id: `user_${Date.now()}` },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });
            profilePicture = uploadResult.secure_url;
        }

        const newUser = new User({ ...req.body, profilePicture });
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'An error occurred while creating the user.', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching users.', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -__v');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json(user);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Invalid ID format.' });
        }
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
};

exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password -__v');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user by username.', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        let profilePicture = req.body.profilePicture;

        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'devplus_users', public_id: `user_${Date.now()}` },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });
            profilePicture = uploadResult.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { ...req.body, profilePicture },
            { new: true, runValidators: true }
        ).select('-password -__v');

        if (!updatedUser) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'An error occurred while updating the user.', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user.', error: error.message });
    }
};
