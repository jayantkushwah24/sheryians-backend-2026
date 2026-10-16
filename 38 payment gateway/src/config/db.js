import mongoose from "mongoose";
import { config } from "./env.config.js";

async function connectDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log("mongodb connected");
}

export default connectDB;
