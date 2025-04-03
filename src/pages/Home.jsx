import React from "react";
import { useTheme } from "../themeContext";
import "./home.css";
import lightVideo from "../assets/videos/writing.mp4";
import darkVideo from "../assets/videos/writing-dark.mp4";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`home ${darkMode ? "dark" : "light"}`}>
      <video
        key={darkMode ? "dark-bg" : "light-bg"}
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
        poster={
          darkMode
            ? "../assets/videos/dark-poster.jpg"
            : "../assets/videos/light-poster.jpg"
        }
      >
        <source src={darkMode ? darkVideo : lightVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className="content-overlay">
        <h1>Welcome to Author's Isolation</h1>
        <p>Your ultimate writing companion.</p>
        <div className="quote">
          A writer is a world trapped in a person.
          <div className="author"> — Victor Hugo</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
