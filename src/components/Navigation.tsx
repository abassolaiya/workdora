import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navigation.css";
import { HashLink } from "react-router-hash-link";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">W</div>
          <span className="logo-text">Workdora</span>
        </Link>

        {/* Links */}
        <div className="nav-links">
          {/* <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link> */}
          <Link
            to="/about"
            className={`nav-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About Us
          </Link>
        </div>

        {/* CTA */}
        <div className="nav-cta">
          <HashLink smooth to="/#waitlist" className="waitlist-btn">
            Join Waitlist
          </HashLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
