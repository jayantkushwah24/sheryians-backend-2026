import mongoose from "mongoose";

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.error(error);
  }
};

export default databaseConnect;