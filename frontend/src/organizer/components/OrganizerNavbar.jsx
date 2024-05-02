import React from "react";
import { Link, useParams } from "react-router-dom";

const OrganizerNavbar = () => {
  const { id } = useParams();
  // const arr = [
  //   {
  //     name: "Home",
  //     to: `/organizer/${id}`,
  //   },
  //   {
  //     name: "Create Event",
  //     to: `/organizer/${id}/create-event`,
  //   },
  //   {
  //     name: "My Events",
  //     to: `/organizer/${id}/my-events`,
  //   },
  //   {
  //     name: "Sign Out",
  //     to: "/",
  //   },
  // ];
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
        {/* <ul className="navbar-nav">
          {arr.map(({ name, to }, index) => (
            <li key={index} className="nav-item">
              <Link
                className={`nav-link ${path === to ? "active" : ""}`}
                to={to}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul> */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={`/organizer/${id}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/organizer/${id}/create-event`}>
              Create Event
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/organizer/${id}/my-events`}>
              My Events
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

export default OrganizerNavbar;
