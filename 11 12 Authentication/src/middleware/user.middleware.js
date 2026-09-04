import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ message: "token not foune" });
  }

  // const { id } = jwt.decode(token);
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(id);

  req.user = user;

  next();
};
