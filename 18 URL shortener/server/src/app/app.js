import express from "express";
import dns from "dns";
import urlRoutes from "../routes/url.routes.js";
import redirectController from "../controllers/redirect.controller.js";

const app = express();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(express.json());

app.use("/api/url", urlRoutes);

app.get("/:code", redirectController);

export default app;
