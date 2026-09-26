import express from "express";
import dns from "dns";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;
