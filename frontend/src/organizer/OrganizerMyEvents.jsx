import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OrganizerNavbar from "./components/OrganizerNavbar";
import OrganizerFooter from "./components/OrganizerFooter";
import Spinner from "../components/Spinner";

const EventModal = ({ event, setInc }) => {
  // useState and useEffect
  const [eventName, setEventName] = useState(event.name);
  const [eventDate, setEventDate] = useState(event.date.split("T")[0]);
  const [eventStatus, setEventStatus] = useState(event.status);
  /////////////
  /////////////
  const handleEditEvent = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `http://localhost:5555/events/${event._id}`,
        {
          ...event,
          name: eventName,
          date: eventDate,
          status: "pending",
        }
      );
      console.log(response.data);
      setEventStatus("pending");
      alert("Request for edit in event is submitted to moderators...");
      setInc((inc) => inc + 1);
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
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-light"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        View Event
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {event.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {/* Body of the modal is starting here */}
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Event Name</label>
                  <input
                    type="text"
                    className="form-control"
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
                    min={minDate}
                    max={maxDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Event Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventStatus}
                    readOnly
                  />
                </div>
                <hr />
                <h5>Moderator Comments</h5>
                {event.comments.length === 0 ? (
                  <div>No comments from moderators till now.</div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Moderator Email</th>
                        <th scope="col">Time</th>
                        <th scope="col">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.comments.map((e, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{e.moderatorId}</td>
                          <td>{e.time}</td>
                          <td>{e.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleEditEvent} className="btn btn-primary">
                Send Request to Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// main component of this page
const OrganizerMyEvents = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // this variable to used to detect changes in the modals,
  // if it is incremented, then useEffect will be run again to update the list
  const [inc, setInc] = useState(0);
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/events/organizerId/${id}`
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, [inc]);
  return (
    <div className="container">
      <OrganizerNavbar id={id} />
      {loading ? (
        <Spinner />
      ) : events.length === 0 ? (
        <div>No events are found to be created by you.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Event Name</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{e.name}</td>
                <td>{e.date.split("T")[0]}</td>
                <td>{e.status}</td>
                <td>
                  <EventModal event={e} setInc={setInc} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <OrganizerFooter id={id} />
    </div>
  );
};

export default OrganizerMyEvents;
