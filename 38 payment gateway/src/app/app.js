import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import paymentRouter from "../routes/payment.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Payment gateway API is running" });
});

app.use("/api/payments", paymentRouter);

export default app;
