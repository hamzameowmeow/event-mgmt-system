import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ParticipantNavbar from "./components/ParticipantNavbar";
import ParticipantFooter from "./components/ParticipantFooter";

const ParticipateModal = ({ event }) => {
  const eventId = event._id;
  const { id } = useParams();
  const closeRef = useRef();
  const navigate = useNavigate();
  const handleParticipate = async () => {
    try {
      const response = await axios.post(`http://localhost:5555/participation`, {
        eventId: eventId,
        participantId: id,
      });
      console.log(response.data);
      alert("Participated Successfully!");
      closeRef.current.click();
      navigate(`/participant/${id}/my-events`);
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
        Participate
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
              Do you wish to participate in this event?
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
                onClick={handleParticipate}
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

const UpcomingEvents = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fun = async () => {
      try {
        // the events the participant has already participated in
        const participatedResponse = await axios.get(
          `http://localhost:5555/participation/participantId/${id}`
        );
        const participated = (e) => {
          return participatedResponse.data.some((f) => e._id === f.eventId);
        };
        console.log(participatedResponse.data);
        //////////////////////////
        // all events
        const response = await axios.get("http://localhost:5555/events");
        console.log(response.data.map((e) => e.date));
        const cur = new Date();
        const a = response.data.filter(
          (e) =>
            cur < new Date(e.date) &&
            e.status === "approved" &&
            !participated(e)
        );
        a.sort((x, y) => {
          if (x.date < y.date) {
            return -1;
          }
          return 1;
        });
        const b = await Promise.all(
          a.map(async (e) => {
            const organizer = (
              await axios.get(`http://localhost:5555/users/${e.organizerId}`)
            ).data;
            return {
              ...e,
              organizerName: organizer.name,
              organizerEmail: organizer.email,
            };
          })
        );
        console.log(b);
        setEvents(b);
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
        <h2>Upcoming Events</h2>
        {loading ? (
          <Spinner />
        ) : events.length === 0 ? (
          <div>No upcoming events.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Event Name</th>
                <th scope="col">Date</th>
                <th scope="col">Organizer Name</th>
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
                    <ParticipateModal event={e} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ParticipantFooter />
    </>
  );
};

export default UpcomingEvents;
