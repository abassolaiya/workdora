import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="logo-icon">BG</div>
          <span className="logo-text">BERESHIT GLOBAL</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`nav-item ${
              location.pathname === "/services" ? "active" : ""
            }`}
          >
            Services
          </Link>
          <Link
            to="/projects"
            className={`nav-item ${
              location.pathname === "/projects" ? "active" : ""
            }`}
          >
            Projects
          </Link>
          <Link
            to="/about"
            className={`nav-item ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`nav-item ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
