import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrganizerNavbar from "./components/OrganizerNavbar";
import OrganizerFooter from "./components/OrganizerFooter";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const ListOfParticipantModal = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/participation`);
        const p = response.data
          .filter((e) => e.eventId === eventId)
          .map(
            async ({ participantId }) =>
              await axios.get(`http://localhost:5555/users/${participantId}`)
          );
        setParticipants(p);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-secondary px-4 me-md-2"
        data-toggle="modal"
        data-target="#listOfParticipants"
      >
        List of Participants
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="listOfParticipants"
        data-backdrop="static"
        data-keyboard="true"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                List of Participants
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
            <div className="modal-body">
              {loading ? (
                <Spinner />
              ) : participants.length === 0 ? (
                <div>No participants yet.</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((e, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EventNotifications = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(event, loading);
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/events/${eventId}`
        );
        console.log(response.data);
        setEvent({ ...response.data });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-info px-4 me-md-2"
        data-toggle="modal"
        data-target="#eventNotifications"
      >
        Event Notifications
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="eventNotifications"
        data-backdrop="static"
        data-keyboard="true"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Event Notifications
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
            <div className="modal-body">
              {loading ? (
                <Spinner />
              ) : event.notifications.length === 0 ? (
                <div>No notifications yet.</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Notification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.notifications.map((e, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {new Date(e.time).toLocaleString().split(", ")[0]}
                        </td>
                        <td>
                          {new Date(e.time).toLocaleString().split(", ")[1]}
                        </td>
                        <td>{e.notification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SendNotification = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/events/${eventId}`
        );
        setEvent({ ...response.data });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  const handleSendNotification = async () => {
    if (!message) {
      alert("Message field cannot be empty!");
      return;
    }
    try {
      const d = new Date();
      const notifications = [
        ...event.notifications,
        {
          time: d.toISOString(),
          notification: message,
        },
      ];
      console.log(notifications.map((e) => e.time));
      notifications.sort((a, b) => {
        if (a.time > b.time) {
          console.log(-1);
          return -1;
        }
        console.log(1);
        return 1;
      });
      const response = await axios.put(
        `http://localhost:5555/events/${eventId}`,
        {
          ...event,
          notifications: notifications,
        }
      );
      console.log(response.data);
      alert("Notification sent successfully!");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary px-4"
        data-toggle="modal"
        data-target="#sendNotifications"
      >
        Send Notification
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="sendNotifications"
        data-backdrop="static"
        data-keyboard="true"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Send Notification
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
            <div className="modal-body">
              <div>
                <div className="form-group">
                  <label>Message</label>
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendNotification}
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OrganizerShowEvent = () => {
  const { id, eventId } = useParams();
  // useState and useEffect
  const [event, setEvent] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  ///////////
  useEffect(() => {
    const fun = async () => {
      try {
        let response = await axios.get(`http://localhost:5555/users/${id}`);
        setUser(response.data);
        response = await axios.get(`http://localhost:5555/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  return (
    <div className="container">
      <OrganizerNavbar id={id} />
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
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              to={`/organizer/${id}/my-events`}
              type="button"
              className="btn btn-outline-secondary px-4 me-md-2"
            >
              Go Back
            </Link>
            <ListOfParticipantModal />
            <EventNotifications />
            <SendNotification />
          </div>
        </div>
      )}
      <OrganizerFooter id={id} />
    </div>
  );
};

export default OrganizerShowEvent;
