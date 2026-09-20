import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";

export async function registerController(req, res) {
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "user already exists with this email address",
      errors: [
        {
          field: "email",
          message: "email already exists",
        },
      ],
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 10),
  });

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role,
  });

  return res.status(201).json({
    message: "user registered successfully",
    data: {
      user,
    },
  });
}
