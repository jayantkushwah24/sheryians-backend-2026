import React from "react";

const NotesForm = ({ handleChange, handleSubmit, formData, updateId }) => {
  return (
    <form id="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={formData.description}
        required
        minLength={20}
        onChange={handleChange}
      />
      <button type="submit">{updateId ? "Update Note" : "Add Note"}</button>
    </form>
  );
};

export default NotesForm;
