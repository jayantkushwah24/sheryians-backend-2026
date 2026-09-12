import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};

export default config;
