import React, { useState } from "react";

const IdeaCard = ({
  idea,
  onEdit,
  onDelete,
  isEditing,
  onSaveEdit,
  onCancelEdit,
}) => {
  const [editedIdea, setEditedIdea] = useState({ ...idea });

  const handleSave = () => {
    onSaveEdit(idea.id, editedIdea);
  };

  return (
    <div className="idea-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedIdea.heading}
            onChange={(e) =>
              setEditedIdea({ ...editedIdea, heading: e.target.value })
            }
          />
          <textarea
            value={editedIdea.content}
            onChange={(e) =>
              setEditedIdea({ ...editedIdea, content: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{idea.heading}</h3>
          <p>{idea.content}</p>
          <button onClick={() => onEdit(idea.id)}>Edit</button>
          <button onClick={() => onDelete(idea.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default IdeaCard;
