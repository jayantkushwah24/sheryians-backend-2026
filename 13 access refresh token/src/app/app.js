import express from "express";
import connectDatabase from "../config/db.config.js";

const app = express();

app.use(express.json());

await connectDatabase();

app.get("/", (req, res) => {
  res.send("hey");
});

export default app;
