import React from "react";
import Card from "./card";
import EventCard from "./event-card"

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      events: [],
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      open: null
    };
  }

  async componentDidMount() {
    const res = await this.getEvents();

    if (res.err)
      return

    if (res)
      this.setState({events: res});
  }

  render() {
    return (
      <div>
        {this.state.open}
        <div className={"d-flex flex-wrap"}>
          {
            this.state.events.map((event) => (
              <Card onClick={() => this.openEvent(event.event_id)} key={event.event_id} data={event}/>
            ))
          }
        </div>
      </div>

    );
  }

  getEvents = async () => {
    const msg = {
      method: "GET",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token}
    };

    const get = await fetch("/events", msg);
    const res = await get.json();

    return res;
  }

  openEvent = (event_id) => {
    // getting the data for the event clicked

    let data = null;
    for (let i = 0; i < this.state.events.length; i++)
    {
      if (this.state.events[i].event_id === event_id) {
        data = this.state.events[i];
        break;
      }
    }

    this.setState({open:
      <EventCard data={data}></EventCard>
    });

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export default Dashboard;
