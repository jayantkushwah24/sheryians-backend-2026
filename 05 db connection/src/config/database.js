const { default: mongoose } = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jayantkushwah8_db_user:qy534FpQNGc9vmUN@cluster0.en6vsmx.mongodb.net/",
    );
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in db", error);
  }
};

module.exports = connectDatabase;
