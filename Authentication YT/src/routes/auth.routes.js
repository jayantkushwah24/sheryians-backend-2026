import express from "express";
import {
  getMe,
  logout,
  refresh,
  register,
} from "../controllers/auth.controllers.js";
const authRouter = express.Router();

/**
 * @POST /api/auth/register
 */
authRouter.post("/register", register);

/**
 * @GET /api/auth/get-me
 */
authRouter.get("/get-me", getMe);

/**
 * @POST /api/auth/refresh
 */
authRouter.post("/refresh", refresh);

/**
 * @POST /api/auth/logout
 */
authRouter.post("/logout", logout);

export default authRouter;
