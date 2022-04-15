import React from "react";

class Register extends React.Component {
    state = {
        username: "",
        password: "",
        alert: ""
    };

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Register</h1>
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
                 Create
              </button>
            </div>

            <div className="text-center">
                        <p>Already a member? <a href="/login" className="">Login</a></p>
                        <p className="text-primary">{this.state.alert}</p>
            </div>
          </div>
        </form>
      </div>
    );
  }


    handleUser = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePass = (e) => {
        this.setState({ password: e.target.value });
    };

    postRegister = async () => {
        const msg = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };

        const post = await fetch("/register", msg);
        const res = await post.json();
        return res;
    };

    handleSubmit = async (e) => {
        const res = await this.postRegister();
        console.log(res)
        if (res.err)
            this.setState({alert: res.err});

        if (res.msg) {
            this.setState({ alert: res.msg });
        }
    };
}

export default Register;
