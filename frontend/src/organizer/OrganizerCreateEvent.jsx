import React, { useEffect, useState } from "react";
import axios from "axios";
import OrganizerNavbar from "./components/OrganizerNavbar";
import OrganizerFooter from "./components/OrganizerFooter";
import { useParams } from "react-router-dom";

const OrganizerCreateEvent = () => {
  // useState and useEffect
  const { id } = useParams();
  // commented for now
  // const [user, setUser] = useState({});
  // const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  useEffect(() => {
    const fun = async () => {
      try {
        // commented for now
        // const response = await axios.get(`http://localhost:5555/users/${id}`);
        // setUser(response.data);
        // setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  });

  // handleCreateEvent
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!eventName || !eventDate) {
      alert("All fields are necessary.");
      return;
    }
    const event = {
      name: eventName,
      date: eventDate,
      organizerId: id,
    };
    try {
      const response = await axios.post("http://localhost:5555/events", event);
      console.log(response.data);
      alert("Event Request Submitted Successfully.");
      setEventName("");
      setEventDate("");
    } catch (error) {
      console.log(error);
    }
  };
  // defining some constant values
  const curDate = new Date();
  const minDate = curDate.toISOString().split("T")[0];
  const x = 10; // adding x days to curDate to get MaxDate
  const maxDate = new Date(curDate.getTime() + x * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  return (
    <div className="container">
      <OrganizerNavbar id={id} />
      <form>
        <h2>Create Event</h2>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name of the event"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            className="form-control"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
        </div>
        <button onClick={handleCreateEvent} className="btn btn-primary">
          Create Event
        </button>
      </form>
      <OrganizerFooter id={id} />
    </div>
  );
};

export default OrganizerCreateEvent;
