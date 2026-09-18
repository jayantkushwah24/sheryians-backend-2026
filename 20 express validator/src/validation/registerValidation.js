import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("email")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
  body("phone")
    .exists()
    .withMessage("phone is required")
    .isMobilePhone("en-IN")
    .withMessage("phone number is invalid"),
  body("password")
    .exists()
    .withMessage("password is required")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password should be atleast 6 charactor"),

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
