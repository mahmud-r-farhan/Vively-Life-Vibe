const { body, validationResult } = require('express-validator');

const validateUser = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('contact')
    .optional()
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid phone number'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage('Bio cannot exceed 250 characters'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation Error', errors: errors.array() });
  }
  next();
};

module.exports = { validateUser, validateRequest };