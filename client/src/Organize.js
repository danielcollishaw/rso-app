import React from "react";
import Nav from "./components/nav";
import EventForm from "./components/event-form";

function Organize() {
  return (
    <div className="Login">
        <Nav></Nav>
        <div className="container w-50 p-4 position-absolute top-50 start-50 translate-middle">
          <EventForm></EventForm>
        </div>
    </div>
  );
}

export default Organize;
