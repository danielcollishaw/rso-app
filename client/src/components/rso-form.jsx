import React from "react";

class RsoForm extends React.Component {

  constructor() {
    super()

    this.state = {
      name: "",
      email: "",
      refresh: -1,
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id")
    };
  }

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Create a RSO</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="form-outline mt-5 mb-3">
              <input onChange={this.handleName} id="name" className="form-control" placeholder="Name"/>
            </div>

            <div className="form-outline mb-3">
              <input onChange={this.handleEmail} id="email" className="form-control" placeholder="Email"/>
            </div>

            <div className="row mb-4">
               <button onClick={this.handleSubmit} className="btn btn-outline-primary rounded-pill" type="button">
                 Create
              </button>
            </div>

            <div className="text-center">
              <p className="text-primary">{this.state.alert}</p>
            </div>

            <meta httpEquiv="refresh" content={this.state.refresh}/>
          </div>
        </form>
      </div>
    );
  }

  handleName = (e) => {
    this.setState({name: e.target.value});
  };

  handleEmail = (e) => {
    this.setState({email: e.target.value});
  };


  postRso = async () => {
    const msg = {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email
      })
    };

    const post = await fetch("/rso", msg);
    const res = await post.json()
    return res;
  };

  handleSubmit = async (e) => {
    // Checks for empty fields to prevent empty creations
    const strState = JSON.stringify(this.state).slice(1, -1).split(",")

    for (let i = 0; i < strState.length; i++) {
      if (strState[i].split(":")[1] === "\"\"")
      {
        this.setState({alert: "Empty fields"});
        return;
      }
    }

    const res = await this.postRso();

    if (res.err) {
      if (res.err.message)
        this.setState({alert: res.err.message});
      else
        this.setState({alert: res.err})
    }

    if (res.response) {
      this.setState({alert: "Created rso", refresh: 1});
    }
  };
}

export default RsoForm;
