import express from "express";

import postsRoute from "./routes/posts.route.js";

const app = express();

app.use(express.json());

app.use("/posts", postsRoute);

app.get("/", (req, res) => res.send("hey"));

export default app;
