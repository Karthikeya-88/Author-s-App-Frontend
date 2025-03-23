import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Ideas from "./pages/Ideas";
import Quotes from "./pages/Quotes";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
