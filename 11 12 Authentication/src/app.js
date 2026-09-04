import express from "express";
import authRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("hi");
});

export default app;
