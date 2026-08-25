const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
  },
});

const NotesModel = mongoose.model("notes", notesSchema);
module.exports = NotesModel;
