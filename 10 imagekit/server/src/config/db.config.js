import mongoose from "mongoose";

export function connectDatabase() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("mongodb is connected"))
    .catch((err) => console.log("error in connecting to db", err));
}
