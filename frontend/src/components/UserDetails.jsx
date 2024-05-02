import React from "react";

const UserDetails = ({ user }) => {
  return (
    <div>
      <h2>Hello, {user.name}</h2>
      <h3>{user.role}</h3>
      {Object.keys(user).map((key, index) => (
        <div key={index}>
          {key}: {user[key]}
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
