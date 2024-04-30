import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModeratorNavbar from "./components/ModeratorNavBar";
import ModeratorFooter from "./components/ModeratorFooter";
import Spinner from "../components/Spinner";

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

const ModeratorHome = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/users/${id}`);
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  return (
    <div className="container">
      <ModeratorNavbar id={id} />
      {loading ? <Spinner /> : <UserDetails user={user} />}
      <ModeratorFooter id={id} />
    </div>
  );
};

export default ModeratorHome;
