import React, { useState } from "react";
import { useTheme } from "../themeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import "./settings.css";

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);

  const handleFontSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setFontSize(newSize);
    document.documentElement.style.setProperty(
      "--user-font-size",
      `${newSize}px`
    );
  };

  return (
    <div className={`settings ${darkMode ? "dark" : "light"}`}>
      <h1 style={{ fontSize: "44px" }}>Settings</h1>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Dark Mode</h2>
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </div>
      <div className={`user-guide ${darkMode ? "dark" : "light"}`}>
        <h4>User Guide</h4>
        <p style={{ marginTop: "0px" }}>
          Welcome to the Writer's App! Here's how you can use the application:
        </p>

        <h5>1. Getting Started</h5>
        <ul style={{ fontSize: "small" }}>
          <li>
            <strong>Home Page:</strong> Navigate to the home page for a quick
            overview of the app.
          </li>
        </ul>

        <h5>2. Writing Documents</h5>
        <ul style={{ fontSize: "small" }}>
          <li>
            <strong>Create a Document:</strong> Go to the{" "}
            <strong>Editor</strong> page to start writing. Use the rich text
            editor to format your content.
          </li>
          <li>
            <strong>Save Documents:</strong> Your documents are automatically
            saved and can be accessed anytime.
          </li>
          <li>
            <strong>Edit Documents:</strong> Click on a document to edit its
            content or title.
          </li>
        </ul>

        <h5>3. Managing Ideas</h5>
        <ul style={{ fontSize: "small" }}>
          <li>
            <strong>Add Ideas:</strong> Go to the <strong>Ideas</strong> page to
            jot down quick ideas or plot points.
          </li>
          <li>
            <strong>Organize Ideas:</strong> Use tags or folders to categorize
            your ideas.
          </li>
        </ul>

        <h5>4. Quote Library</h5>
        <ul style={{ fontSize: "small" }}>
          <li>
            <strong>Save Quotes:</strong> Go to the <strong>Quotes</strong> page
            to save inspiring quotes.
          </li>
          <li>
            <strong>Search Quotes:</strong> Use the search bar to find quotes by
            author or keyword.
          </li>
        </ul>

        <h5>5. Search Functionality</h5>
        <ul style={{ fontSize: "small" }}>
          <li>
            <b>Global Search:</b> Use the <strong>Search</strong> page to find
            documents, ideas, or quotes across the app.
          </li>
        </ul>

        <h4>Need Help?</h4>
        <p style={{ fontSize: "small" }}>
          If you have any questions or need assistance, please contact me at{" "}
          <a href="mailto:dkarthikeya888@gmail.com">
            support@author'sisolation.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Settings;
