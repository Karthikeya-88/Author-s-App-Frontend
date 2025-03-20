import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { useTheme } from "../themeContext";
import Popup from "reactjs-popup";
import "./search.css";

const Search = () => {
  const [results, setResults] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentsResponse = await axios.get(
          "https://authorapp-backend-zmso.onrender.com/api/documents"
        );
        const ideasResponse = await axios.get(
          "https://authorapp-backend-zmso.onrender.com/api/ideas"
        );
        const quotesResponse = await axios.get(
          "https://authorapp-backend-zmso.onrender.com/api/quotes"
        );

        setDocuments(documentsResponse.data);
        setIdeas(ideasResponse.data);
        setQuotes(quotesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    // Combine all data
    const allData = [
      ...documents.map((doc) => ({ ...doc, type: "document" })),
      ...ideas.map((idea) => ({ ...idea, type: "idea" })),
      ...quotes.map((quote) => ({ ...quote, type: "quote" })),
    ];

    // Filter data based on the query
    const filteredResults = allData.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div className={`search ${darkMode ? "dark" : "light"}`}>
      <Popup trigger={<h1 style={{ textAlign: "center" }}>Search</h1>}>
        <p style={{ background: "transparant", color: "#777" }}>
          Search for ideas, quotes and your documents.
        </p>
      </Popup>
      <br />
      <SearchBar onSearch={handleSearch} />
      <div className="search-results">
        {results.map((result, index) => (
          <div key={index} className="search-result">
            {result.type === "quote" && (
              <>
                <blockquote>"{result.text}"</blockquote>
                <p>- {result.author}</p>
              </>
            )}
            {result.type === "idea" && (
              <>
                <h3>{result.heading}</h3>
                <p>{result.content}</p>
              </>
            )}
            {result.type === "document" && (
              <>
                <h3>{result.title}</h3>
                <p>
                  <div dangerouslySetInnerHTML={{ __html: result.content }} />
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
