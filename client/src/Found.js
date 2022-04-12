import React from "react";
import Nav from "./components/nav";
import University from "./components/university";

function Found() {
  return (
    <div className="Login">
        <Nav></Nav>
        <div className="container w-50 p-4 position-absolute top-50 start-50 translate-middle">
          <University></University>
        </div>
    </div>
  );
}

export default Found;
