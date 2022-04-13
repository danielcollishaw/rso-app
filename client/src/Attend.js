import React from "react";
import Nav from "./components/nav";
import JoinUni from "./components/join-uni";

function Attend() {
  return (
    <div className="Login">
        <Nav></Nav>
        <div className="container w-50 p-4 position-absolute top-50 start-50 translate-middle">
          <JoinUni></JoinUni>
        </div>
    </div>
  );
}

export default Attend;
