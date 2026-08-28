const express = require("express");
const {
  getAllNotesController,
  createNotesController,
  getSingleNoteController,
  updateNoteController,
  deleteNoteController,
} = require("../controllers/notes.controller");
const router = express.Router();

// create
router.post("/create", createNotesController);

// read
router.get("/allNotes", getAllNotesController);
router.get("/:id", getSingleNoteController);

// update
router.put("/:id", updateNoteController);

// delete
router.delete("/:id", deleteNoteController);

module.exports = router;
