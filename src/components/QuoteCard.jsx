import React, { useState } from "react";

const QuoteCard = ({
  quote,
  onEdit,
  onDelete,
  isEditing,
  onSaveEdit,
  onCancelEdit,
}) => {
  const [editedQuote, setEditedQuote] = useState({ ...quote });

  const handleSave = () => {
    onSaveEdit(quote.id, editedQuote);
  };

  return (
    <div className="quote-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedQuote.text}
            onChange={(e) =>
              setEditedQuote({ ...editedQuote, text: e.target.value })
            }
          />
          <input
            type="text"
            value={editedQuote.author}
            onChange={(e) =>
              setEditedQuote({ ...editedQuote, author: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <blockquote>"{quote.text}"</blockquote>
          <p>- {quote.author}</p>
          <button onClick={() => onEdit(quote.id)}>Edit</button>
          <button onClick={() => onDelete(quote.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
