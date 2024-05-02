import React, { useEffect, useState } from "react";
import ParticipantNavbar from "./components/ParticipantNavbar";
import ParticipantFooter from "./components/ParticipantFooter";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import UserDetails from "../components/UserDetails";

const ParticipantHome = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/users/${id}`);
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
      <ParticipantNavbar />
      {loading ? <Spinner /> : <UserDetails user={user} />}
      <ParticipantFooter />
    </div>
  );
};

export default ParticipantHome;
