import React from "react";
import Ratings from "./ratings";
import styles from "./card.module.css";

class Card extends React.Component {

  state = {
    title: this.props.data.name,
    rso: this.props.data.email,
    description: this.props.data.description,
    date: this.props.data.date_time,
    location: this.props.data.address,
    event_id: this.props.data.event_id
  }

  async componentDidMount () {
    const dates = this.props.data.date_time.split("T")[0].split("-");
    const time = this.props.data.start_time.split(":");
    const date = dates[1] + "/" + dates[2] + "/" + dates[0] + " | " + this.toRegularTime(time[0] + ":" + time[1]);


    this.setState({
      title: this.props.data.name,
      rso: this.props.data.email,
      description: this.props.data.description,
      date: date,
      location: this.props.data.address,
      comments: [],
    });

    const res = await this.getReviews();
    if (res) {
      this.setState({comments: res});
      this.calcRating();
    }
  }


  render() {
    return (
      <div onClick={this.props.onClick} className={styles.cardContainer + " card-body m-5"}>
        <h2 className="card-title">{this.state.title}</h2>
        <h5 className="card-subtitle text-muted">{this.state.rso}</h5>
        <div className={styles.ratingsContainer}>
          <Ratings fontSize={"16px"} totalRatings={this.state.total} numRatings={this.state.num}/>
        </div>
        <p className="card-text mt-2">{this.state.description}</p>
        <div className={styles.geoContainer}>
          <p className="card-text mt-2">
            <span className="bi bi-calendar"> </span>
            {this.state.date}
          </p>
          <p className="card-text mt-2">
            <span className="bi bi-geo-alt"> </span>
            {this.state.location}
          </p>
        </div>
      </div>
    );
  }

  getReviews = async () => {
    const msg = {
      method: "GET",
      headers: {"Content-Type": "application/json", "Authorization": localStorage.getItem("token")},
    };

    const get = await fetch("/events/" + this.props.data.event_id + "/reviews", msg);
    const res = await get.json();

    return res;
  };

  calcRating = () => {
    let score = 0;
    let count = 0;
    for (let i = 0; i < this.state.comments.length; i++) {
      if (this.state.comments[i].rating === -1)
        continue;


      score += this.state.comments[i].rating;
      count++;
    }

    this.setState({total: score, num: count});
  }

  toRegularTime = (militaryTime) => {
    const [hours, minutes, seconds] = militaryTime.split(':');
    return `${(hours === 0) ? 12 : (hours > 12) ? hours - 12 : hours}:${minutes}${seconds ? `:${seconds}` : ''} ${(hours >= 12) ? 'PM' : 'AM'}`;
  }
}

export default Card;
