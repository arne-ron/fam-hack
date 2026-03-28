import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="navbar">
      {/*<Link to={"/"}>Test</Link>*/}
      <div className="nav-brand">
        <span className="family-name">Family Name</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/availability" className={({ isActive }) => isActive ? "active" : ""}>
            Availability
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className={({ isActive }) => isActive ? "active" : ""}>
            Calendar
          </NavLink>
          <Link to="/" className="active">
            Home
          </Link>
        </li>
        <li>
          <Link to="/availability">Availability</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <a href={'/preferences'}>Preferences</a>
        </li>
      </ul>
      <div className="nav-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="nav-profile">
          <button className="profile-btn">My Profile</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
