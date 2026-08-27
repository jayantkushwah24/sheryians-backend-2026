const { default: mongoose } = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in connecting to mongodb", error);
  }
};

module.exports = connectDatabase;
