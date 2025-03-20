import React, { useState } from "react";

const DocumentCard = ({
  document,
  onEdit,
  onDelete,
  isEditing,
  onSaveEdit,
  onCancelEdit,
}) => {
  const [editedDocument, setEditedDocument] = useState({ ...document });

  const handleSave = () => {
    onSaveEdit(document.id, editedDocument);
  };

  return (
    <div className="document-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedDocument.title}
            onChange={(e) =>
              setEditedDocument({ ...editedDocument, title: e.target.value })
            }
          />
          <textarea
            value={editedDocument.content}
            onChange={(e) =>
              setEditedDocument({ ...editedDocument, content: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{document.title}</h3>
          <p>{document.content}</p>
          <button onClick={() => onEdit(document.id)}>Edit</button>
          <button onClick={() => onDelete(document.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default DocumentCard;
