import React from "react";

class EventForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: "",
      desc: "",
      phone: "",
      email: "",
      address: "",
      date: "",
      time: "",
      type: "",
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
            <h1 className="text-center text-muted mb-0">Create an Event</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="form-outline mt-5 mb-4">
              <input onChange={this.handleName} id="name" className="form-control" placeholder="Event Name"/>
            </div>

            <div className="form-outline mb-3">
              <textarea onChange={this.handleDesc} id="desc" className="form-control" placeholder="Description"/>
            </div>

            <div className="form-outline mb-3">
              <input onChange={this.handlePhone} id="phone" className="form-control" type="tel" placeholder="Phone"/>
            </div>

            <div className="form-outline mb-3">
              <input onChange={this.handleEmail} id="email" className="form-control" type="email" placeholder="Email"/>
            </div>

            <div className="form-outline mb-3">
              <input onChange={this.handleAddress} id="location" className="form-control" placeholder="Full Address"/>
            </div>

            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="datePick">Date</label>
              <input onChange={this.handleDate} className="form-control text-center" id="datePick" type="datetime-local"></input>
            </div>

            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="groupSelect">Type</label>
              <select onChange={this.handleType} className="form-select" id="groupSelect">
                <option value="none">Choose...</option>
                <option value="rso">RSO</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
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

  handleDesc = (e) => {
    this.setState({desc: e.target.value});
  };

  handlePhone = (e) => {
    this.setState({phone: e.target.value});
  };

  handleEmail = (e) => {
    this.setState({email: e.target.value});
  };

  handleAddress = (e) => {
    this.setState({address: e.target.value});
  };

  handleDate = (e) => {
    const val = e.target.value.split("T");
    const eDate = val[0];
    const eTime = val[1] + ":00";

    this.setState({date: eDate, time: eTime});
  };

  handleType = (e) => {
    this.setState({type: e.target.value.toUpperCase()});
  };

  postEvent = async () => {
    const msg = {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.desc,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
        date_time: this.state.date,
        start_time: this.state.time,
        type_of: this.state.type,
        user_id: this.state.user_id
      })
    };

    const post = await fetch("/events", msg);
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

    const res = await this.postEvent();
    if (res.err) {
      if (res.err.message)
        this.setState({alert: res.err.message});
      else
        this.setState({alert: res.err})
    }

    if (res.response) {
      this.setState({alert: "Created event", refresh: 1});
    }
  };
}

export default EventForm;
