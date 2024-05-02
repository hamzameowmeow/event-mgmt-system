import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ModeratorNavbar from "./components/ModeratorNavBar";
import ModeratorFooter from "./components/ModeratorFooter";
import Spinner from "../components/Spinner";
import ModeratorComments from "../components/ModeratorComments";

const EventModal = ({ event }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const closeRef = useRef();
  const handleViewMore = () => {
    closeRef.current.click();
    navigate(`/moderator/${id}/show-event/${event._id}`);
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
                <hr />
              </form>
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
              <button onClick={handleViewMore} className="btn btn-info">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ModeratorViewPendingEvents = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(events, loading);
  useEffect(() => {
    const fun = async () => {
      const response = await axios.get(`http://localhost:5555/events`);
      const temp = await Promise.all(
        response.data
          .filter((e) => e.status === "pending")
          .map(async (e) => {
            const response = await axios.get(
              `http://localhost:5555/users/${e.organizerId}`
            );
            return {
              ...e,
              organizerName: response.data.name,
              organizerEmail: response.data.email,
            };
          })
      );
      setEvents(temp);
      setLoading(false);
    };
    fun();
  }, []);
  return (
    <div className="container">
      <ModeratorNavbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2>Pending Events</h2>
          {events.length === 0 ? (
            <div>No events are pending.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Organizer Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{e.name}</td>
                    <td>{new Date(e.date).toLocaleString().split(",")[0]}</td>
                    <td>{e.organizerName}</td>
                    <td>
                      <EventModal event={e} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <ModeratorFooter />
    </div>
  );
};

export default ModeratorViewPendingEvents;
