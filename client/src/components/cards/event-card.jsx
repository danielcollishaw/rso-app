import React from "react";
import Ratings from "./ratings";
import styles from "./card.module.css"

class EventCard extends React.Component {
  state = {
    title: "Quizbowl",
    rso: "Late Knights",
    description: "Quiz Bowl is an academic competition between two teams in various fields (including Sciences, Arts, Pop Culture, Literature, and more). We hold practices 2-3 times per week to prepare for competitions which we either host or travel to (places of past tournaments include UF, Georgia Tech, Valencia, and Chicago). We encourage new people to come out to a few practices and experience Quiz Bowl!",
    date: "01/20/22 | 6:30 PM",
    location: "John C. Hitt Library - Room 434",
  };

  render() {
    return (
      <div className="container p-5">
        <div className={styles.eventContainer + " card-body"}>
          <h2 className="fs-1">{this.state.title}</h2>
          <h5 className="card-subtitle text-muted fs-2">{this.state.rso}</h5>
          <div className={styles.ratingsContainer}>
            <Ratings fontSize={"20px"} totalRatings={22} numRatings={5} />
          </div>
          <p className="card-text mt-2 fs-5">{this.state.description}</p>
          <div className="">
            <p className="card-text mt-2">
              <span className="bi bi-calendar"> </span>
              {this.state.date}
            </p>
            <p className="card-text mt-2">
              <span className="bi bi-geo-alt"> </span>
              {this.state.location}
            </p>
          </div>
          <div className={"comment-section mt-3 p-3"}>
            <div className="form-outline mb-3">
              <textarea id="add-comment" className="form-control fs-5" placeholder="write a comment..."/>
            </div>
            <div className="row mb-4">
               <button onClick={this.handleSubmit} className="btn btn-outline-primary rounded-pill" type="button">
                 Comment
              </button>
            </div>
            <div className={styles.commentSection + " comments mt-3 overflow-auto"}>

              <div className="comment1 card mt-3">
                <p className="row m-3 mb-0 card-text fs-5">Ikr it was so good ^_^</p>
                <p className="row m-2 mt-1 mb-1 card-text justify-content-end"><span className="bi bi-person-circle fs-6">
                  <span className="userName m-2">user121</span>
                  <span className="m-2">-</span>
                  <span className="timeStamp m-2">today</span>
                </span></p>
              </div>

              <div className="comment2 card mt-3">
                <p className="row m-3 mb-0 card-text fs-5">This event was so cool!</p>
                <p className="row m-2 mt-1 mb-1 card-text justify-content-end"><span className="bi bi-person-circle fs-6">
                  <span className="userName m-2">user231</span>
                  <span className="m-2">-</span>
                  <span className="timeStamp m-2">1 day ago</span>
                </span></p>
              </div>

              <div className="comment3 card mt-3">
                <p className="row m-3 mb-0 card-text fs-5">I wish there was more food</p>
                <p className="row m-2 mt-1 mb-1 card-text justify-content-end"><span className="bi bi-person-circle fs-6">
                  <span className="userName m-2">user40</span>
                  <span className="m-2">-</span>
                  <span className="timeStamp m-2">2 day ago</span>
                </span></p>
              </div>

              <div className="comment3 card mt-3">
                <p className="row m-3 mb-0 card-text fs-5">@user40 yes we will have pizza!</p>
                <p className="row m-2 mt-1 mb-1 card-text justify-content-end"><span className="bi bi-person-circle fs-6">
                  <span className="userName m-2">user29</span>
                  <span className="m-2">-</span>
                  <span className="timeStamp m-2">3 day ago</span>
                </span></p>
              </div>

              <div className="comment3 card mt-3">
                <p className="row m-3 mb-0 card-text fs-5">will there be food?</p>
                <p className="row m-2 mt-1 mb-1 card-text justify-content-end"><span className="bi bi-person-circle fs-6">
                  <span className="userName m-2">user40</span>
                  <span className="m-2">-</span>
                  <span className="timeStamp m-2">4 day ago</span>
                </span></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
