import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../themeContext";
import Popup from "reactjs-popup";
import "./quotes.css";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ text: "", author: "" });
  const { darkMode } = useTheme();

  // Fetch quotes from the backend
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          "https://authorapp-backend-zmso.onrender.com/api/quotes"
        );
        setQuotes(response.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };
    fetchQuotes();
  }, []);

  // Save a new quote
  const handleAddQuote = async () => {
    if (newQuote.text && newQuote.author) {
      try {
        const response = await axios.post(
          "https://authorapp-backend-zmso.onrender.com/api/quotes",
          newQuote
        );
        setQuotes([...quotes, response.data]);
        setNewQuote({ text: "", author: "" });
      } catch (error) {
        console.error("Error saving quote:", error);
      }
    }
  };

  // Delete a quote
  const handleDeleteQuote = async (id) => {
    try {
      await axios.delete(
        `https://authorapp-backend-zmso.onrender.com/api/quotes/${id}`
      );
      console.log("Deleted Quote:", id);
      setQuotes(quotes.filter((quote) => quote._id !== id));
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  return (
    <div className={`quotes ${darkMode ? "dark" : "light"}`}>
      <Popup trigger={<h1 style={{ textAlign: "center" }}>Quotes</h1>}>
        <p style={{ background: "transparant", color: "#777" }}>
          Quotes are the echoes of wisdom—capture them, cherish them, and let
          them inspire your journey. Save the words that move you, reflect on
          their meaning, and weave them into your story. Your inspiration, your
          voice
        </p>
      </Popup>
      <br />
      <div className="quote-form">
        <input
          type="text"
          placeholder="Quote text"
          value={newQuote.text}
          onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newQuote.author}
          onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
        />
        <button onClick={handleAddQuote}>Add Quote</button>
      </div>
      <div className="quote-list">
        {quotes.map((quote) => (
          <div key={quote._id} className="quote-card">
            <blockquote>"{quote.text}"</blockquote>
            <p>- {quote.author}</p>
            <button onClick={() => handleDeleteQuote(quote._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
