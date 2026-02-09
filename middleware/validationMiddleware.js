const { body, validationResult } = require("express-validator");

exports.validateContact = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 5 }).withMessage("Message must be at least 5 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    next();
  }
];
