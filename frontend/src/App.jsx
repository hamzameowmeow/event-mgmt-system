import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pre-login/Home";
import About from "./pre-login/About";
import Contact from "./pre-login/Contact";
import Login from "./pre-login/Login";
import SignUp from "./pre-login/SignUp";
import OrganizerHome from "./organizer/OrganizerHome";
import OrganizerCreateEvent from "./organizer/OrganizerCreateEvent";
import OrganizerMyEvents from "./organizer/OrganizerMyEvents";
import OrganizerEditEvent from "./organizer/OrganizerEditEvent";
import OrganizerShowEvent from "./organizer/OrganizerShowEvent";
import ModeratorHome from "./moderator/ModeratorHome";
import ModeratorViewPendingEvents from "./moderator/ModeratorViewPendingEvents";
import ModeratorShowEvent from "./moderator/ModeratorShowEvent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/organizer/:id" element={<OrganizerHome />} />
      <Route
        path="/organizer/:id/create-event"
        element={<OrganizerCreateEvent />}
      />
      <Route path="/organizer/:id/my-events" element={<OrganizerMyEvents />} />
      <Route
        path="/organizer/:id/edit-event/:eventId"
        element={<OrganizerEditEvent />}
      />
      <Route
        path="/organizer/:id/show-event/:eventId"
        element={<OrganizerShowEvent />}
      />
      <Route path="/moderator/:id" element={<ModeratorHome />} />
      <Route
        path="/moderator/:id/view-pending-events"
        element={<ModeratorViewPendingEvents />}
      />
      <Route
        path="/moderator/:id/show-event/:eventId"
        element={<ModeratorShowEvent />}
      />
    </Routes>
  );
};

export default App;
