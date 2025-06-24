const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true, 
        minlength: 3 
    },
    firstName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    lastName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, 'Invalid email'] 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        minlength: 6 
    },
    contact: { 
        type: String, 
        trim: true 
    },
    profilePicture: { 
        type: String, 
        default: 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=No+Image' 
    },
    bio: { 
        type: String, 
        maxlength: 250, 
        trim: true 
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password verification method
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);