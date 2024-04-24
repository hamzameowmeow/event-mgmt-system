import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== reEnterPassword) {
      alert("Password is not matching with ReEnterPassword");
      return;
    }
    if (!name || !email || !role || !username || !password) {
      alert("All fields are mandatory.");
      return;
    }
    try {
      // first check if any ${role} already has the given username
      let response = await axios.get(
        `http://localhost:5555/users/roleAndUsername/${role}/${username}`
      );
      if (response.data) {
        alert(`Username already associated with another ${role}.`);
        return;
      }
      // if user doesn't already exists then create user
      const user = {
        name: name,
        email: email,
        username: username,
        password: password,
        role: role,
      };
      response = await axios.post("http://localhost:5555/users/", user);
      console.log(response.data);
      alert("Sign Up Successful!! Please Login to continue...");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <Navbar />
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
          <label>Set Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Password"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Set Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Re-Enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-Enter Password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignUp} className="btn btn-primary">
          Sign Up
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default SignUp;
