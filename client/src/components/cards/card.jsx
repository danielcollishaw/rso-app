import React from "react";
import Ratings from "./ratings";
import styles from "./card.module.css";

class Card extends React.Component {
  state = {
    title: "Quizbowl",
    rso: "Late Knights",
    description:
      "This is our second meeting of the year where we can practice together as a team! ",
    date: "01/20/22 | 6:30 PM",
    location: "John C. Hitt Library - Room 434",
  };

  render() {
    return (
      <div className={styles.cardContainer + " card-body m-5"}>
        <h2 className="card-title">{this.state.title}</h2>
        <h5 className="card-subtitle text-muted">{this.state.rso}</h5>
        <div className={styles.ratingsContainer}>
          <Ratings fontSize={"16px"} totalRatings={0} numRatings={0} />
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
}

export default Card;
