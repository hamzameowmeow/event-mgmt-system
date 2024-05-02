import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrganizerNavbar from "./components/OrganizerNavbar";
import OrganizerFooter from "./components/OrganizerFooter";
import Spinner from "../components/Spinner";
import UserDetails from "../components/UserDetails";

const OrganizerHome = () => {
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
      <OrganizerNavbar />
      {loading ? <Spinner /> : <UserDetails user={user} />}
      <OrganizerFooter />
    </div>
  );
};

export default OrganizerHome;
