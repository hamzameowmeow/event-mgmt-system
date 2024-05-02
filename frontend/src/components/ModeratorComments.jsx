import React from "react";

const ModeratorComments = ({ event }) => {
  return (
    <>
      <h5>Moderator Comments</h5>
      {event.comments.length === 0 ? (
        <div>No comments from moderators till now.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Moderator Email</th>
              <th scope="col">Time</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {event.comments.map((e, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{e.moderatorId}</td>
                <td>{e.time}</td>
                <td>{e.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ModeratorComments;
