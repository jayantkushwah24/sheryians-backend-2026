import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("email is required")
    .trim()
    .bail()
    .isEmail()
    .withMessage("invalid email"),
  body("name")
    .exists()
    .withMessage("name is required")
    .trim()
    .bail()
    .isString()
    .withMessage("name must be string")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("name must be between 2 to 50 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .trim()
    .bail()
    .isString()
    .withMessage("password must be a string")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password must be minimum 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "invalid request",
        errors: errors.array(),
      });
    }

    next();
  },
];
