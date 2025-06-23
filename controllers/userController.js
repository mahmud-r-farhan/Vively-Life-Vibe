const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ 
            $or: [{ username: req.body.username }, { email: req.body.email }] 
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already in use.' });
        }

        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
            bio: req.body.bio,
        });

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
        const users = await User.find().select('-__v'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching users.', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
       
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ message: 'User not found (invalid ID format).' });
        }
        res.status(500).json({ message: 'An error occurred while fetching the user.', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-__v');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
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
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user.', error: error.message });
    }
};