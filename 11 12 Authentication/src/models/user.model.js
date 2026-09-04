import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
