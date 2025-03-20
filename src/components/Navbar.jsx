import { Link } from "react-router-dom";
import {
  FaPenNib,
  FaLightbulb,
  FaQuoteRight,
  FaSearch,
  FaCog,
} from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Author's Isolation
      </Link>
      <div className="navbar-links">
        <Link to="/editor" className="nav-link">
          <FaPenNib className="nav-icon" />
          <span>Editor</span>
        </Link>
        <Link to="/ideas" className="nav-link">
          <FaLightbulb className="nav-icon" />
          <span>Ideas</span>
        </Link>
        <Link to="/quotes" className="nav-link">
          <FaQuoteRight className="nav-icon" />
          <span>Quotes</span>
        </Link>
        <Link to="/search" className="nav-link">
          <FaSearch className="nav-icon" />
          <span>Search</span>
        </Link>
        <Link to="/settings" className="nav-link">
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
