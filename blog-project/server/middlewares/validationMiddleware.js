import { body, validationResult } from "express-validator";

// Reusable handler — put this after any validate[] array
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg, // return first error only
    });
  }
  next();
};

export const validateSignup = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 2, max: 30 }).withMessage("Username must be 2–30 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  handleValidationErrors,
];

export const validateLogin = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

export const validateBlog = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 150 }).withMessage("Title must be under 150 characters"),

  body("content")
    .trim()
    .notEmpty().withMessage("Content is required"),

  body("tags")
    .optional()
    .isArray().withMessage("Tags must be an array"),

  body("image")
    .optional()
    .isURL().withMessage("Image must be a valid URL"),

  handleValidationErrors,
];