import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../themeContext";
import Popup from "reactjs-popup";
import "./editor.css";
import RichTextEditor from "../components/RichTextEditor";

const Editor = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({ title: "", content: "" });
  const [editingDocument, setEditingDocument] = useState(null);
  const { darkMode } = useTheme();

  // Fetch documents from the backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        console.log("Fetching documents...");
        const response = await axios.get(
          "https://authorapp-backend-zmso.onrender.com/api/documents"
        );
        console.log("Fetched Documents:", response.data);
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, []);

  // Save a new document
  const handleAddDocument = async () => {
    if (newDocument.title && newDocument.content) {
      console.log("Saving Document:", newDocument);
      try {
        const response = await axios.post(
          "https://authorapp-backend-zmso.onrender.com/api/documents",
          newDocument
        );
        console.log("Saved Document:", response.data);
        setDocuments([...documents, response.data]);
        setNewDocument({ title: "", content: "" });
      } catch (error) {
        console.error("Error saving document:", error);
      }
    } else {
      console.error("Title or content is empty");
    }
  };

  // Edit a document
  const handleEditDocument = async (id, updatedDocument) => {
    try {
      const response = await axios.put(
        `https://authorapp-backend-zmso.onrender.com/api/documents/${id}`,
        updatedDocument
      );
      console.log("Updated Document:", response.data);
      setDocuments(
        documents.map((doc) => (doc._id === id ? response.data : doc))
      );
      setEditingDocument(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(
        `https://authorapp-backend-zmso.onrender.com/api/documents/${id}`
      );
      console.log("Deleted Document:", id);
      setDocuments(documents.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className={`editor ${darkMode ? "dark" : "light"}`}>
      <Popup trigger={<h1 style={{ textAlign: "center" }}>Editor</h1>}>
        <p style={{ background: "transparant", color: "#777" }}>
          Unleash your creativity with the Editor—a powerful tool designed to
          craft, refine, and manage your stories. Seamlessly save your ideas,
          polish your drafts, and remove what no longer serves your vision. Your
          stories, your control.
        </p>
      </Popup>
      <br />
      <div className="document-form">
        <input
          type="text"
          placeholder="Title"
          value={newDocument.title}
          className="edit-input"
          onChange={(e) =>
            setNewDocument({ ...newDocument, title: e.target.value })
          }
        />
        <RichTextEditor
          value={newDocument.content}
          onChange={(content) => setNewDocument({ ...newDocument, content })}
        />
        <button onClick={handleAddDocument} className="save-button">
          Save
        </button>
      </div>
      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc._id} className="document-card">
            {editingDocument === doc._id ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={doc.title}
                  onChange={(e) =>
                    setDocuments(
                      documents.map((d) =>
                        d._id === doc._id ? { ...d, title: e.target.value } : d
                      )
                    )
                  }
                />
                <RichTextEditor
                  value={doc.content}
                  onChange={(content) =>
                    setDocuments(
                      documents.map((d) =>
                        d._id === doc._id ? { ...d, content } : d
                      )
                    )
                  }
                />
                <button
                  onClick={() => handleEditDocument(doc._id, doc)}
                  className="save-button"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingDocument(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{doc.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: doc.content }} />
                <button
                  onClick={() => setEditingDocument(doc._id)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDocument(doc._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
