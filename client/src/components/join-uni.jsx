import React from "react";

class JoinUni extends React.Component {
  constructor() {
    super()

    this.state = {
      uni_id: "",
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      universities: [],
      refresh: -1
    };
  }

  async componentDidMount() {
    const res = await this.getUniversities();

    if (res)
      this.setState({universities: res})
  }

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Join University</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="groupSelect">University</label>
              <select onChange={this.handleId} className="form-select" id="groupSelect">
                <option value="none">Choose...</option>
                {this.state.universities.map(uni => (
                  <option key={uni.uni_id} value={uni.uni_id}>{uni.name}</option>
                ))}
              </select>
            </div>

            <div className="row mb-4">
               <button onClick={this.handleSubmit} className="btn btn-outline-primary rounded-pill" type="button">
                 Join
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

  handleId = (e) => {
    this.setState({uni_id: e.target.value});
  };

  getUniversities = async () => {
    const msg = {
      method: "GET",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token}
    };

    const get = await fetch("/university", msg);
    const res = await get.json();

    return res;
  }

  postAttend = async () => {
    const msg = {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
      body: JSON.stringify({
      })
    };

    const post = await fetch("/university/" + this.state.uni_id, msg);
    const res = await post.json()
    return res;
  };

  handleSubmit = async (e) => {
    if (this.state.uni_id === "") {
      this.setState({alert: "please pick a university"});
      return;
    }

    const res = await this.postAttend();

    if (res.err) {
      if (res.err.message)
        this.setState({alert: res.err.message});
      else
        this.setState({alert: res.err})
    }

    if (res.affectedRows > 0) {
      this.setState({alert: "Joined", refresh: 1});
    }
  };
}

export default JoinUni;
