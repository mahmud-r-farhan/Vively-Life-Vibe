const User = require('../models/User');
const ApiError = require('../utils/ApiError');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -__v');
    if (!user) throw new ApiError(404, 'User not found');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};