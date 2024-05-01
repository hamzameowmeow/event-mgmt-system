import axios from "axios";
import React, { useEffect, useState } from "react";

const UpcomingEvents = ({ user }) => {
  const { _id } = user;
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    try {
      const fun = async () => {
        // the events the participant has already participated in
        const participatedResponse = await axios.get(
          `http://localhost:5555/participation/participantId/${_id}`
        );
        const participated = (e) => {
          return participatedResponse.data.some((f) => e._id == f._id);
        };
        //////////////////////////
        // all events
        const response = await axios.get("http://localhost:5555/events");
        const cur = new Date();
        const a = response.data.filter(
          (e) =>
            cur < new Date(e.time) &&
            e.status === "approved" &&
            !participated(e)
        );
        setEvents(a);
      };
      fun();
    } catch (error) {
      console.log(error);
    }
  }, []);
  /// I WAS WORKING ON THIS FUNCTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  const handleParticipate = async (index) => {
    try {
      const { _id } = events[index];
      console.log(_id);
      const response = await axios.post(`http://localhost:5555/participation`, {
        eventId: events[index]._id,
        participantId: user._id,
      });
      console.log(response.data);
      alert("Participated...");
      setEvents(events.filter((e) => e.eventId != events[index]._id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Event Name</th>
          <th scope="col">Time</th>
          <th scope="col">Organizer</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{e.name}</td>
            <td>{e.time}</td>
            <td>{e.organizerEmail}</td>
            <td>
              <button className="btn" onClick={() => handleParticipate(index)}>
                Participate
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UpcomingEvents;
