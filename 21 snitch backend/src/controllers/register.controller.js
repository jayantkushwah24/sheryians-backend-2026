import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.utils.js";

/**
 * @description Register an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.name String
 * @param req.body.password String
 */

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

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  return res.status(201).json({
    message: "user registered successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      accessToken,
    },
  });
}

/**
 * @description Login a user and create new set of accessToken and refreshToken
 * @param req.body.email String
 * @param req.body.password String
 */

export async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const isPasswordValid = bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findOneAndUpdate({ email }, { refreshToken });

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  return res.status(200).json({
    message: "user loggedin successfully",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
}

export async function refreshController(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is required.",
    });
  }

  try {
    const { userId, role } = readRefreshToken(readRefreshToken);

    const user = await userModel.findById(userId);

    if (refreshToken != user.refreshToken) {
      await userModel.findOneAndUpdate(user._id, { refreshToken: null });

      return res.status(401).json({
        message: "Refresh token mismatch",
      });
    }

    const accessToken = createAccessToken({
      userId,
      role,
    });

    const newRefreshToken = createRefreshToken({
      userId,
      role,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Tokens rotated successfully.",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh Token",
    });
  }
}

export async function getMe(req, res) {
  const { userId, role } = req.user;

  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "User data fetch successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    },
  });
}
