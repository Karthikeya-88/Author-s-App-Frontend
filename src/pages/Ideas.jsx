import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../themeContext";
import Popup from "reactjs-popup";
import "./ideas.css";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState({ heading: "", content: "" });
  const [editingIdea, setEditingIdea] = useState(null);
  const { darkMode } = useTheme();

  // Fetch ideas from the backend
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get(
          "https://authorapp-backend-zmso.onrender.com/api/ideas"
        );
        setIdeas(response.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };
    fetchIdeas();
  }, []);

  // Save a new idea
  const handleAddIdea = async () => {
    if (newIdea.heading && newIdea.content) {
      try {
        const response = await axios.post(
          "https://authorapp-backend-zmso.onrender.com/api/ideas",
          newIdea
        );
        setIdeas([...ideas, response.data]);
        setNewIdea({ heading: "", content: "" });
      } catch (error) {
        console.error("Error saving idea:", error);
      }
    }
  };

  // Edit an idea
  const handleEditIdea = async (id, updatedIdea) => {
    try {
      const response = await axios.put(
        `https://authorapp-backend-zmso.onrender.com/api/ideas/${id}`,
        updatedIdea
      );
      console.log("Updated Idea:", response.data);
      setIdeas(ideas.map((idea) => (idea._id === id ? response.data : idea)));
      setEditingIdea(null);
    } catch (error) {
      console.error("Error updating idea:", error);
    }
  };

  // Delete an idea
  const handleDeleteIdea = async (id) => {
    try {
      await axios.delete(
        `https://authorapp-backend-zmso.onrender.com/api/ideas/${id}`
      );
      console.log("Deleted Idea:", id);
      setIdeas(ideas.filter((idea) => idea._id !== id));
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  return (
    <div className={`ideas ${darkMode ? "dark" : "light"}`}>
      <Popup trigger={<h1 style={{ textAlign: "center" }}>Ideas</h1>}>
        <p style={{ background: "transparant", color: "#777" }}>
          Ideas are the seeds of innovation—capture them, nurture them, and
          watch them grow. Save your sparks of inspiration, refine them into
          brilliance, and turn your thoughts into reality. Your ideas, your
          future.
        </p>
      </Popup>
      <br />
      <div className="idea-form">
        <input
          type="text"
          placeholder="Heading"
          value={newIdea.heading}
          onChange={(e) => setNewIdea({ ...newIdea, heading: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newIdea.content}
          onChange={(e) => setNewIdea({ ...newIdea, content: e.target.value })}
        />
        <button onClick={handleAddIdea} style={{ width: "100%" }}>
          Add Idea
        </button>
      </div>
      <div className="idea-list">
        {ideas.map((idea) => (
          <div key={idea._id} className="idea-card">
            {editingIdea === idea._id ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={idea.heading}
                  onChange={(e) =>
                    setIdeas(
                      ideas.map((i) =>
                        i._id === idea._id
                          ? { ...i, heading: e.target.value }
                          : i
                      )
                    )
                  }
                />
                <textarea
                  className="edit-textarea"
                  value={idea.content}
                  onChange={(e) =>
                    setIdeas(
                      ideas.map((i) =>
                        i._id === idea._id
                          ? { ...i, content: e.target.value }
                          : i
                      )
                    )
                  }
                />
                <button
                  className="save-button"
                  onClick={() => handleEditIdea(idea._id, idea)}
                >
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditingIdea(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{idea.heading}</h3>
                <p>{idea.content}</p>
                <button
                  className="edit-button"
                  onClick={() => setEditingIdea(idea._id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteIdea(idea._id)}
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

export default Ideas;
