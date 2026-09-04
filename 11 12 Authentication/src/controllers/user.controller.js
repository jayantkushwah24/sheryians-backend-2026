import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // save data to db
    const user = await userModel.create({
      fullName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // creating token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    return res.status(201).json({
      message: "user created successfully",
      data: {
        user: {
          id: user._id,
          fullName,
          email,
        },
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

export default registerUser;
