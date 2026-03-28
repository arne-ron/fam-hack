import React from "react";

const Navbar: React.FC = () => {
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
      <div className="nav-profile">
        <button className="profile-btn">My Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
