import { body } from "express-validator";

export const productValidator = [
  body("title")
    .exists()
    .withMessage("title is required")
    .bail()
    .isString()
    .withMessage("title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("title must contains 2 to 100 characters")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("title can only have english alphabets"),
  body("description")
    .exists()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be 10 to 500 characters long."),
  body("price.amount")
    .exists()
    .withMessage("price's amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("price amount must be a floating number and greater than 0"),
  body("price.currency")
    .exists()
    .withMessage("price currency is required")
    .bail()
    .isString()
    .withMessage("price currency must be a string")
    .isIn(["USD", "INR"])
    .withMessage("currency must be either INR or USD")
];
