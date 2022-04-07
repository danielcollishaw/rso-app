import React from "react";
import Nav from "./components/nav";
import Register from "./components/register";

function RegisterPage() {
  return (
    <div className="Login">
        <Nav></Nav>
        <div className="container w-50 p-4 position-absolute top-50 start-50 translate-middle">
          <Register></Register>
        </div>
    </div>
  );
}

export default RegisterPage;
