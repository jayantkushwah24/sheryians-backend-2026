import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
