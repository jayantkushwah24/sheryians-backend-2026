import express from "express";
import authRouter from "../routes/auth.routes.js";
import productRouter from "../routes/product.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.user("/api/products", productRouter);

export default app;
