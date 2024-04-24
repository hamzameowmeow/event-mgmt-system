import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    if (!role || !email || !password) {
      alert("All fields are necessary.");
      return;
    }
    axios
      .get(`http://localhost:5555/users/${email}/${role}`)
      .then((response) => {
        if (!response.data || response.data.password !== password) {
          alert("Invalid Credentials!");
          return;
        }
        navigate(`/${role}/${response.data._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <Navbar />
      <form>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="inputRole">Select Role</label>
          <select
            className="form-control"
            id="inputRole"
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
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
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
