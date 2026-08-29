const express = require("express");
const fileRoute = require("./routes/file.route");
const app = express();

app.use(express.json());

app.use("/file", fileRoute);

app.get("/", (req, res) => {
  res.send("ok");
});

module.exports = app;
