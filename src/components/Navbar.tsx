import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Initial check for system preference or manual set
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
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
      <div className="nav-brand">
        <span className="family-name">Family Name</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#" className="active">
            Home
          </a>
        </li>
        <li>
          <a href="#">Availability</a>
        </li>
        <li>
          <a href="#">Calendar</a>
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
