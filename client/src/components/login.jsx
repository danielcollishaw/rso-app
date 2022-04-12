import React from "react";

class Login extends React.Component {

  state = {
    user: "",
    pass: "",
    alert: "",
    refresh: -1
  };

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Sign In</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="form-outline mt-5 mb-4">
              <input onChange={this.handleUser} id="user" className="form-control" placeholder="Username"/>
            </div>

            <div className="form-outline mb-5">
              <input onChange={this.handlePass} id="pass" className="form-control" placeholder="Password" type="password"/>
            </div>

            <div className="row mb-4">
               <button onClick={this.handleSubmit} className="btn btn-outline-primary rounded-pill" type="button">
                 Submit
              </button>
            </div>

            <div className="text-center">
              <p>Not a member? <a href="/register" className="">Register</a></p>
              <p className="text-primary">{this.state.alert}</p>
            </div>

            <meta httpEquiv="refresh" content={this.state.refresh}/>
          </div>
        </form>
      </div>
    );
  }

  handleUser = (e) => {
    this.setState({user: e.target.value});
  };

  handlePass = (e) => {
    this.setState({pass: e.target.value});
  };

  postLogin = async () => {
    const msg = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username: this.state.user, password: this.state.pass})
    };

    const post = await fetch("/login", msg);
    const res = await post.json();
    return res;
  };

  handleSubmit = async (e) => {
    const res = await this.postLogin();

    if (res.err)
      this.setState({alert: res.err});

    if (res.msg) {
      this.setState({alert: res.msg, refresh: 1});

      // Storing session info
      localStorage.setItem('user_id', res.user.user_id);
      localStorage.setItem('username', res.user.username);
      localStorage.setItem('token', res.token);
    }
  };

}

export default Login;
