import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  MONGO_URI: process.env.MONGO_URI,
};

export default config;
