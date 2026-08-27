const express = require("express");
const connectDatabase = require("../config/db");
const app = express();
const notesRouter = require("../router/notes.router");

connectDatabase();

app.use(express.json());

app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("hey");
});

module.exports = app;
