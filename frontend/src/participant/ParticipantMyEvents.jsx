import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ParticipantNavbar from "./components/ParticipantNavbar";
import ParticipantFooter from "./components/ParticipantFooter";

const MyEvents = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    try {
      const fun = async () => {
        const response = await axios.get(
          `http://localhost:5555/participation/participantId/${_id}`
        );
        console.log(response.data);
        const arr = [];
        response.data.forEach(async ({ eventId }) => {
          arr.push(
            (await axios.get(`http://localhost:5555/events/${eventId}`)).data
          );
        });
        setEvents([...arr]);
      };
      fun();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleUnparticipate = (index) => {
    console.log("handleUnParticipate");
  };
  return (
    <div className="container">
      <ParticipantNavbar />
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
                {/* <button
                className="btn"
                onClick={() => handleUnParticipate(index)}
              >
                Unparticipate
              </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ParticipantFooter />
    </div>
  );
};

export default MyEvents;
