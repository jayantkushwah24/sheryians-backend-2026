import express from "express";
import { addToCartValidator } from "../validators/cart.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @method POST
 * @route /api/cart
 * @access protected
 * @description Add an product to the user's cart
 */
// req.body = { productId,quantity,size}
router.post("/", authenticate, addToCartValidator);

/**
 * @method GET
 * @route /api/cart
 * @access protected
 * @description Get the user's cart
 */
router.get("/", authenticate);

export default router;
