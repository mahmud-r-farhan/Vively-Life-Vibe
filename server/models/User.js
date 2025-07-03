const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      validate: {
        validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    },
    contact: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !value || validator.isMobilePhone(value, 'any', { strictMode: false }),
        message: 'Invalid phone number',
      },
    },
    profilePicture: {
      type: String,
      default: 'https://placehold.co/400x400/EFEFEF/AAAAAA?text=No+Image',
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Invalid URL for profile picture',
      },
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [250, 'Bio cannot exceed 250 characters'],
    },
  },
  { timestamps: true, strict: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);