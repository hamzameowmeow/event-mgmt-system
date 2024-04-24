import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pre-login/Home";
import About from "./pre-login/About";
import Contact from "./pre-login/Contact";
import Login from "./pre-login/Login";
import SignUp from "./pre-login/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
