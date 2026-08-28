const express = require("express");
const connectDatabase = require("./config/db");
const app = express();
const notesRouter = require("./router/notes.router");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/notes", notesRouter);

connectDatabase();

app.get("/", (req, res) => {
  res.send("hey");
});

module.exports = app;
