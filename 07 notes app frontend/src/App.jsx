import { useEffect, useState } from "react";
import { axiosInstance } from "./config/axiosInstance";
import NotesCard from "./components/NotesCard";
import NotesForm from "./components/NotesForm";

const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [allNotes, setAllNotes] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const getAllNotes = async () => {
    try {
      const res = await axiosInstance.get("/notes/allNotes");
      setAllNotes(res?.data?.data);
    } catch (error) {
      console.log("error in fetching all notes", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/notes/${noteId}`);
      getAllNotes();
    } catch (error) {
      console.log("error in deleting note", error);
    }
  };

  const updateNote = async (noteId) => {
    setUpdateId(noteId);

    try {
      const res = await axiosInstance.get(`/notes/${noteId}`);
      setFormData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateId) {
      try {
        await axiosInstance.put(`/notes/${updateId}`, formData);
        setUpdateId(null);
      } catch (error) {
        console.log("error in updating note", error);
      }
    } else {
      try {
        await axiosInstance.post("notes/create", formData);
      } catch (error) {
        console.log("error in creating new note", error);
      }
    }

    setFormData({
      title: "",
      description: "",
    });
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div>
      <h1>Notes App</h1>
      <div>
        <NotesForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          updateId={updateId}
        />
      </div>
      <div>
        <NotesCard
          allNotes={allNotes}
          deleteNote={deleteNote}
          updateNote={updateNote}
        />
      </div>
    </div>
  );
};

export default App;
