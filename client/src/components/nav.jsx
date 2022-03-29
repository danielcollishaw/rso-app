import React from "react";

class Nav extends React.Component {
  state = {

  };

  render() {
    return (
      <div className={"navbar justify-content-end border-bottom border-dark"}>
        <a className={"nav-item nav-link text-dark"}>Home</a>
        <a className={"nav-item nav-link text-dark"}>Login</a>
      </div>
    );
  }
}

export default Nav;
