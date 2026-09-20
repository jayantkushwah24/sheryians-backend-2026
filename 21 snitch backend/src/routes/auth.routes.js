import express from "express";
import { registerValidator } from "../validators/auth.validators.js";
import { registerController } from "../controllers/register.controller.js";

const router = express.Router();

router.post("/register", registerValidator, registerController);

export default router;
