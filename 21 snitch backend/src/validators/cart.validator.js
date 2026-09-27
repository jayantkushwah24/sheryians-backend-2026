import { body, validationResult } from "express-validator";

export const addToCartValidator = [
  body("productId")
    .exists()
    .withMessage("product id is required")
    .bail()
    .isString()
    .withMessage("product id must be a string")
    .bail()
    .isMongoId()
    .withMessage("product id must be a mongo id"),
  body("quantity")
    .exists()
    .withMessage("quantity is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("quantity must be an integer greater than 0"),
  body("size")
    .exists()
    .withMessage("size is required")
    .bail()
    .isString()
    .withMessage("size must be a string")
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("size must be one of XS, S, M, L, XL, XXL"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "cart validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];
