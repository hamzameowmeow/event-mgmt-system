import React from "react";
import { Link, useParams } from "react-router-dom";

const ModeratorNavbar = () => {
  const { id } = useParams();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to={`/organizer/${id}`}>
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={`/moderator/${id}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={`/moderator/${id}/view-pending-events`}
            >
              View Pending Events
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ModeratorNavbar;
