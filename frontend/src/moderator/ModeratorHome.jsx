import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModeratorNavbar from "./components/ModeratorNavBar";
import ModeratorFooter from "./components/ModeratorFooter";
import Spinner from "../components/Spinner";
import UserDetails from "../components/UserDetails";

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
      <ModeratorNavbar />
      {loading ? <Spinner /> : <UserDetails user={user} />}
      <ModeratorFooter />
    </div>
  );
};

export default ModeratorHome;
