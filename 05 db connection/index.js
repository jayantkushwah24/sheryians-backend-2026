const express = require("express");
const connectDatabase = require("./src/config/database");
const NotesModel = require("./src/model/notes.model");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();
const PORT = 3000;

app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/create", async (req, res) => {
  let { title, description } = req.body;

  const newNote = await NotesModel.create({
    title,
    description,
  });

  res.send({
    success: true,
    message: "Note created successfully",
    data: newNote,
  });
});

app.listen(PORT, () => {
  console.log("app is listening on the port ", PORT);
});

module.exports = app;
