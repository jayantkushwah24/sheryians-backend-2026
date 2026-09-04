import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  return res.status(200).json({
    message: "Login successfully",
    data: {
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    },
    token,
  });
}

export default loginController;
