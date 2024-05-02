import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OrganizerNavbar from "./components/OrganizerNavbar";
import OrganizerFooter from "./components/OrganizerFooter";
import Spinner from "../components/Spinner";
import ModeratorComments from "../components/ModeratorComments";

const EventModal = ({ event }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const closeRef = useRef();
  const handleEditEvent = () => {
    closeRef.current.click();
    navigate(`/organizer/${id}/edit-event/${event._id}`);
  };
  const handleShowParticipants = () => {
    closeRef.current.click();
    navigate(`/organizer/${id}/show-event/${event._id}`);
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-light"
        data-toggle="modal"
        data-target={`#staticBackdrop${event._id}`}
      >
        View Event
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id={`staticBackdrop${event._id}`}
        data-backdrop="static"
        data-keyboard="true"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
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
                ref={closeRef}
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
                    value={event.name}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={event.date.split("T")[0]}
                    readOnly
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
              </form>
              <hr />
              <ModeratorComments eventId={event._id} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleEditEvent} className="btn btn-info">
                Request Edit in Event
              </button>
              <button
                onClick={handleShowParticipants}
                className="btn btn-primary"
                disabled={event.status === "pending"}
              >
                Show Participants
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
  }, []);
  return (
    <div className="container">
      <OrganizerNavbar />
      <h2>My Events</h2>
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
                <td>{new Date(e.date).toLocaleString().split(",")[0]}</td>
                <td>{e.status}</td>
                <td>
                  <EventModal event={e} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <OrganizerFooter />
    </div>
  );
};

export default OrganizerMyEvents;
