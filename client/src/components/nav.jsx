import React from "react";

class Nav extends React.Component {
  state = {
    organize: null,
    found: null,
  };

  constructor() {
    super();
    this.state = {login: <a className="nav-item nav-link text-dark" href="/login">Login</a>};

    // Check for user login
    if (localStorage.getItem("user_id")) {
      this.state = {
        ...this.state,
        organize: <a className="nav-item nav-link text-dark" href="/organize">Organize Event</a>,
        login: <a onClick={() => localStorage.clear()} className="nav-item nav-link text-dark" href="/login">Logout</a>,
        found: <a className="nav-item nav-link text-dark" href="/university">Create University</a>
      };
    }
  }

  render() {
    return (
      <div className="navbar justify-content-end border-bottom border-dark">
        {this.state.organize}
        {this.state.found}
        <a className="nav-item nav-link text-dark" href="/">Home</a>
        {this.state.login}
      </div>
    );
  }
}

export default Nav;
