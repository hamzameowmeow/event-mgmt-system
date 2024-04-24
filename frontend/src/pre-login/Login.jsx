import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!role || !username || !password) {
      alert("All fields are necessary.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5555/users/roleAndUsername/${role}/${username}`
      );
      if (!response.data || response.data.password !== password) {
        alert("Invalid Credentials!");
        return;
      }
      console.log(response.data);
      // navigate(`/${role}/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <Navbar />
      <form>
        <h2>Login</h2>
        <div className="form-group">
          <label>Select Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select an input</option>
            <option value="participant">Participant</option>
            <option value="organizer">Organizer</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignIn} className="btn btn-primary">
          Sign In
        </button>
        <p>
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
