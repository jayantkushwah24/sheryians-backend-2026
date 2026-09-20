import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";
import {
  getMe,
  loginController,
  refreshController,
  registerController,
} from "../controllers/register.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = { email,name,password }
 * @response res.status = 201 (if successful)
 */
router.post("/register", registerValidator, registerController);

/**
 * @POST /api/auth/login
 * @param req
 * @param req.body = {email,password}
 * res.status = 200
 */
router.post("/login", loginValidator, loginController);

/**
 * @POST /api/auth/refresh
 */
router.post("/refresh", refreshController);

/**
 * @GET /api/auth/me
 */
router.get("/me", authenticate, getMe);

export default router;
