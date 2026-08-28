import React from "react";

const NotesCard = ({ allNotes, deleteNote, updateNote }) => {
  return (
    <div>
      {allNotes?.map(({ _id, title, description }) => {
        return (
          <div key={_id}>
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={() => updateNote(_id)}>Update</button>
            <button onClick={() => deleteNote(_id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default NotesCard;
