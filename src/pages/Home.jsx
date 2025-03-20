import React from "react";
import { useTheme } from "../themeContext";
import "./home.css";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`home ${darkMode ? "dark" : "light"}`}>
      <h1>Welcome to Author's Isolation</h1>
      <p>Your ultimate writing companion.</p>
      <div className="quote">
        "A writer is a world trapped in a person."
        <div className="author">- Victor Hugo</div>
      </div>
    </div>
  );
};

export default Home;
