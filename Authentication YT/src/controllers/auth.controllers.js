import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";
import sessionModel from "../model/session.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isAlreadyExists = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyExists) {
    return res.status(400).json({
      message: "username or email already exists",
    });
  }

  const newUser = await UserModel.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const refreshToken = jwt.sign(
    {
      id: newUser._id,
    },
    config.JWT_SECRET,
    { expiresIn: "15d" },
  );

  const session = await sessionModel.create({
    userId: newUser._id,
    refreshTokenHash: await bcrypt.hash(refreshToken, 10),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    {
      id: newUser._id,
      sessionId: session._id,
    },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully",
    data: {
      username: newUser.username,
      email: newUser.email,
    },
    accessToken,
  });
};

export const getMe = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "access Token not found",
    });
  }

  const { id } = jwt.verify(accessToken, config.JWT_SECRET);

  const user = await UserModel.findById(id);

  return res.status(200).json({
    message: "User fetched successfully",
    data: {
      user,
    },
  });
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token not found",
    });
  }

  const sessions = await sessionModel.find({
    revoked: false,
  });

  let session;

  for (const s of sessions) {
    if (await bcrypt.compare(refreshToken, s.refreshTokenHash)) {
      session = s;
      break;
    }
  }

  if (!session) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  const { id } = jwt.verify(refreshToken, config.JWT_SECRET);

  const accessToken = jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });

  const newRefreshToken = jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: "15d",
  });

  const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

  session.refreshTokenHash = newRefreshTokenHash;

  await session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "access token refresh successfully",
    accessToken,
  });
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: true,
  });

  if (!session) {
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
