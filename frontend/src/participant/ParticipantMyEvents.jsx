import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ParticipantNavbar from "./components/ParticipantNavbar";
import ParticipantFooter from "./components/ParticipantFooter";
import Spinner from "../components/Spinner";

const UnParticipateModal = ({ event }) => {
  const eventId = event._id;
  const { id } = useParams();
  const closeRef = useRef();
  const navigate = useNavigate();
  const handleUnParticipate = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5555/participation/${eventId}/${id}`
      );
      console.log(response.data);
      alert("You have successfully cancelled your participation!");
      closeRef.current.click();
      navigate(`/participant/${id}/upcoming-events`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-outline-primary"
        data-toggle="modal"
        data-target={`#staticBackdrop${eventId}`}
      >
        UnParticipate
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id={`staticBackdrop${eventId}`}
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
                ref={closeRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Do you wish to cancel your participation in this event?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUnParticipate}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MyEvents = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(events);
  useEffect(() => {
    try {
      const fun = async () => {
        const response = await axios.get(
          `http://localhost:5555/participation/participantId/${id}`
        );
        const arr = await Promise.all(
          response.data.map(async ({ eventId }) => {
            const event = (
              await axios.get(`http://localhost:5555/events/${eventId}`)
            ).data;
            const organizer = (
              await axios.get(
                `http://localhost:5555/users/${event.organizerId}`
              )
            ).data;
            return {
              ...event,
              organizerName: organizer.name,
              organizerEmail: organizer.email,
            };
          })
        );
        setEvents(arr);
        setLoading(false);
      };
      fun();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container">
      <ParticipantNavbar />
      <h2>My Events</h2>
      {loading ? (
        <Spinner />
      ) : events.length === 0 ? (
        <div>You have not participated in any event.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Event Name</th>
              <th scope="col">Date</th>
              <th scope="col">Organizer</th>
              <th scope="col">Organizer Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{e.name}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{e.organizerName}</td>
                <td>{e.organizerEmail}</td>
                <td>
                  <UnParticipateModal event={e} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ParticipantFooter />
    </div>
  );
};

export default MyEvents;
