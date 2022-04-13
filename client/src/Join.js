import React from "react";
import Nav from "./components/nav";
import JoinRso from "./components/join-rso"
function Home() {
  return (
    <div className="Home">
        <Nav></Nav>
        <div className="container w-50 p-4 position-absolute top-50 start-50 translate-middle">
          <JoinRso></JoinRso>
        </div>
    </div>
  );
}

export default Home;
