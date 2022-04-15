import React from "react";

class JoinRso extends React.Component {
  constructor() {
    super()

    this.state = {
      rso_id: "",
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      rsos: [],
      refresh: -1
    };
  }

  async componentDidMount() {
    const res = await this.getRsos();
    if (res)
      this.setState({rsos: res})
  }

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Join RSOs</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="groupSelect">RSOs</label>
              <select onChange={this.handleId} className="form-select" id="groupSelect">
                <option value="none">Choose...</option>
                {this.state.rsos.map(rso => (
                  <option key={rso.rso_id} value={rso.rso_id}>{rso.name}</option>
                ))}
              </select>
            </div>

            <div className="row mb-4">
               <button onClick={this.handleSubmit} className="btn btn-outline-primary rounded-pill" type="button">
                 Join
              </button>

              <button onClick={this.postLeave} className="btn btn-outline-primary rounded-pill mt-3" type="button">
                Leave
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

  getRsos = async () => {
    const msg = {
      method: "GET",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token}
    };

    const get = await fetch("/rso", msg);
    const res = await get.json();

    return res.response;
  };

  handleId = (e) => {
    this.setState({rso_id: e.target.value});
  };

  postLeave = async () => {
    const msg = {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
    };

    const post = await fetch("/rso/" + this.state.rso_id, msg);
    const res = await post.json()

    if (res.err) {
      if (res.err.message)
        this.setState({alert: res.err.message});
      else
        this.setState({alert: res.err})
    }

    if (res.response)
      if (res.response.affectedRows > 0)
        this.setState({alert: "Left", refresh: 1});
  }

  postJoin = async () => {
    const msg = {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
      body: JSON.stringify({
      })
    };

    const post = await fetch("/rso/" + this.state.rso_id, msg);
    const res = await post.json()
    return res;
  };

  handleSubmit = async (e) => {
    if (this.state.rso_id === "") {
      this.setState({alert: "please pick a rso"})
      return
    }

    const res = await this.postJoin();

    if (res.err) {
      if (res.err.message)
        this.setState({alert: res.err.message});
      else
        this.setState({alert: res.err})
    }

    if (res.response)
      if (res.response.affectedRows > 0)
        this.setState({alert: "Joined", refresh: 1});

  };
}

export default JoinRso;
