import React from "react";

class Register extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Register</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="form-outline mt-5 mb-4">
              <input id="user" className="form-control" placeholder="Username"/>
            </div>

            <div className="form-outline mb-5">
              <input id="pass" className="form-control" placeholder="Password"/>
            </div>

            <div className="row mb-4">
               <button className="btn btn-outline-primary rounded-pill" >
                 Create
              </button>
            </div>

            <div className="text-center">
              <p>Already a member? <a href="/login" className="">Login</a></p>
            </div>
          </div>
        </form>
      </div>
    );
  }


}

export default Register;
