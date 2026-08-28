const NotesModel = require("../models/notes.model");

const createNotesController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNotes = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "notes created successfully",
      data: newNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();

    return res.status(200).json({
      message: "all notes fetched successfully",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await NotesModel.findById(noteId);

    return res.status(200).json({
      message: "single note fetched",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const updateNoteController = async (req, res) => {
  try {
    const noteId = req.params.id;
    const body = req.body;

    const updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      new: true,
    });

    return res.status(200).json({
      message: "note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    const noteId = req.params.id;
    await NotesModel.findByIdAndDelete(noteId);

    return res.status(200).json({
      message: "note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createNotesController,
  getAllNotesController,
  getSingleNoteController,
  updateNoteController,
  deleteNoteController,
};
