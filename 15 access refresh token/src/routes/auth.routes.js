import express from "express";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      message: "User already exists",
      errors: [{ message: "User already exists", path: "email" }],
    });
  }

  const newUser = await userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });

  const { accessToken, refreshToken } = generateTokens({ userId: newUser._id });

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  user.refreshToken = refreshToken;
  await newUser.save();

  res.status(200).json({
    message: "User registered successfully",
    data: {
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    },
    accessToken,
  });
});

router.get("/me", async (req, res) => {
  const accessToken = req.header.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "Unauthorized, access token not found",
    });
  }

  try {
    const decoded = verifyAccessToken(accessToken);

    const user = await userModel.findById(decoded.id);

    return res.status(200).json({
      message: "user fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired token",
    });
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decoded.id);

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;

      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id,
    });

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refresh token",
    });
  }
});

export default router;
