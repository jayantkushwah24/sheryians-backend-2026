import express from "express";
import registerUser from "../controllers/user.controller.js";
import { authentication } from "../middleware/user.middleware.js";
import loginController from "../controllers/login.controller.js";

const route = express.Router();

route.post("/register", registerUser);

route.get("/me", authentication, (req, res) => {
  return res.status(200).json({
    message: "user fetched successfully",
    user_data: req.user,
  });
});

route.post("/login", loginController);

export default route;
