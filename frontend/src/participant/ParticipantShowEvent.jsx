import React, { useEffect, useRef, useState } from "react";
import ParticipantNavbar from "./components/ParticipantNavbar";
import ParticipantFooter from "./components/ParticipantFooter";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import EventNotificationComponent from "../components/EventNotificationComponent";
import axios from "axios";
import { Link } from "react-router-dom";

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
        data-target={`#unparticipate${eventId}`}
      >
        UnParticipate
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id={`unparticipate${eventId}`}
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

const ParticipantShowEvent = () => {
  const { id, eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  console.log(event);
  useEffect(() => {
    const fun = async () => {
      try {
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
  return (
    <>
      <ParticipantNavbar />
      <div className="container mt-4">
        <h2>Event Details</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div>
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
            <EventNotificationComponent className="m-4" eventId={eventId} />
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                to={`/organizer/${id}/my-events`}
                type="button"
                className="btn btn-outline-secondary px-4 me-md-2"
              >
                Go Back
              </Link>
              <UnParticipateModal event={event} />
            </div>
          </div>
        )}
      </div>
      <ParticipantFooter />
    </>
  );
};

export default ParticipantShowEvent;
