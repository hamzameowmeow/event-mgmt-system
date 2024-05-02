import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";

const ModeratorComments = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(comments, loading);

  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/events/${eventId}`
        );
        const temp = await Promise.all(
          response.data.comments.map(async (e) => {
            const res = await axios.get(
              `http://localhost:5555/users/${e.moderatorId}`
            );
            return {
              ...e,
              moderatorName: res.data.name,
              moderatorEmail: res.data.email,
            };
          })
        );
        setComments(temp);
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
      ) : comments.length === 0 ? (
        <div>No comments from moderators till now.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Moderator Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date and Time</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((e, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{e.moderatorName}</td>
                <td>{e.moderatorEmail}</td>
                <td>{new Date(e.time).toLocaleString()}</td>
                <td>{e.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

{
  /* <h5>Moderator Comments</h5>
{loading ? (
  <Spinner />
) : event.comments.length === 0 ? (
  <div>No comments from moderators till now.</div>
) : (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Moderator Name</th>
        <th scope="col">Time</th>
        <th scope="col">Comment</th>
      </tr>
    </thead>
    <tbody>
      {comments.map((e, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{e.moderatorName}</td>
          <td>{new Date(e.time).toLocaleString()}</td>
          <td>{e.comment}</td>
        </tr>
      ))}
    </tbody>
  </table>
)} */
}

// const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   ///
//   useEffect(() => {
//     const fun = async () => {
//       try {
//         const temp = await Promise.all(
//           event.comments.map(async (e) => {
//             const res = await axios.get(
//               `http://localhost:5555/users/${e.moderatorId}`
//             );
//             return {
//               ...e,
//               moderatorName: res.data.name,
//             };
//           })
//         );
//         setComments(temp);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fun();
//   }, []);

// {loading ? (
//   <Spinner />
// ) : comments.length === 0 ? (
//   <div>No comments yet.</div>
// ) : (
//   <table className="table">
//     <thead>
//       <tr>
//         <th scope="col">#</th>
//         <th scope="col">Moderator Name</th>
//         <th scope="col">Date and Time</th>
//         <th scope="col">Comment</th>
//       </tr>
//     </thead>
//     <tbody>
//       {comments.map((e, index) => (
//         <tr key={index}>
//           <th scope="row">{index + 1}</th>
//           <td>{e.moderatorName}</td>
//           <td>{new Date(e.time).toLocaleString()}</td>
//           <td>{e.comment}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// )}

export default ModeratorComments;
