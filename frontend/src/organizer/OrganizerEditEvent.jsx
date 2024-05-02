import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrganizerNavbar from "./components/OrganizerNavbar";
import OrganizerFooter from "./components/OrganizerFooter";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const OrganizerEditEvent = () => {
  const { id, eventId } = useParams();
  console.log(id, eventId);
  // useState and useEffect
  const [event, setEvent] = useState({});
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(event);
  ///////////
  useEffect(() => {
    const fun = async () => {
      try {
        // let response = await axios.get(`http://localhost:5555/users/${id}`);
        // setUser(response.data);
        const response = await axios.get(
          `http://localhost:5555/events/${eventId}`
        );
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  ///////////
  const handleEditEvent = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `http://localhost:5555/events/${event._id}`,
        {
          ...event,
          status: "pending",
        }
      );
      console.log(response.data);
      setEvent({ ...event, status: "pending" });
      alert("Request for edit in event is submitted to moderators...");
    } catch (error) {
      console.log(error);
    }
  };

  // some constants
  const curDate = new Date();
  const minDate = curDate.toISOString().split("T")[0];
  const x = 10; // adding x days to curDate to get MaxDate
  const maxDate = new Date(curDate.getTime() + x * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="container">
      <OrganizerNavbar />
      <h2>Edit Event</h2>
      {loading ? (
        <Spinner />
      ) : (
        <form>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              className="form-control"
              value={event.name}
              onChange={(e) => {
                setEvent({ ...event, name: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Event Date</label>
            <input
              type="date"
              className="form-control"
              value={event.date.split("T")[0]}
              onChange={(e) => {
                setEvent({ ...event, date: e.target.value });
              }}
              min={minDate}
              max={maxDate}
            />
          </div>
          <div className="form-group">
            <label>Event Status</label>
            <input
              type="text"
              className="form-control"
              value={event.status}
              readOnly
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              to={`/organizer/${id}/my-events`}
              type="button"
              className="btn btn-outline-secondary px-4 me-md-2"
            >
              Go Back
            </Link>
            <Link
              to=""
              onClick={handleEditEvent}
              type="button"
              className="btn btn-primary px-4"
            >
              Request Edit
            </Link>
          </div>
        </form>
      )}
      <OrganizerFooter />
    </div>
  );
};

export default OrganizerEditEvent;
