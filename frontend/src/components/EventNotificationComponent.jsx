import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";

const EventNotificationComponent = ({ eventId }) => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
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
                <td>{new Date(e.time).toLocaleString().split(", ")[0]}</td>
                <td>{new Date(e.time).toLocaleString().split(", ")[1]}</td>
                <td>{e.notification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EventNotificationComponent;
