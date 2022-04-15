import React from "react";
import Ratings from "./ratings";
import styles from "./card.module.css"

class EventCard extends React.Component {

  constructor() {
    super()

    this.state = {
      comments: [],
      comment: "",
      rating: -1,
      time: new Date(),
      alert: "",
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      post: "",
      stars: [
        { id: 1, value: 0 },
        { id: 2, value: 0 },
        { id: 3, value: 0 },
        { id: 4, value: 0 },
        { id: 5, value: 0 },
      ]
    }
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
      event_id: this.props.data.event_id
    });

    const res = await this.getReviews();
    if (res) {
      res.sort(function(a,b){return a.time < b.time})
      for (let i = 0; i < res.length; i++)
      {
        let username = await this.getUser(res[i].user_id);

        if (!username)
          username = "user"

        res[i]["username"] = username;
      }

      this.setState({comments: res});
      this.calcRating();
    }
  }


  render() {
    return (
      <div className="container p-5">
        <div className={styles.eventContainer + " card-body"}>
          <h2 className="fs-1">{this.state.title}</h2>
          <h5 className="card-subtitle text-muted fs-2">{this.state.rso}</h5>
          <div className={styles.ratingsContainer}>
            <Ratings fontSize={"20px"} totalRatings={this.state.total} numRatings={this.state.num} />
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
            <div style={{"fontSize": "12px "}} className=" star-meter">
              {this.state.stars.map((star) => (
                <span
                  style={{ color: this.getStarColor() }}
                  key={star.id}
                  className={this.getStarIcon(star.value) + " m-2"}
                  onClick={() => this.handleRate(star.id)}
                ></span>
              ))}
              <span className={"m-3 badge bg-" + this.getRatingStatus()}>
                <span className="bi bi-star-fill m-2"></span>
                {this.calcAvgRate()}
              </span>
            </div>
            <div className="form-outline mb-3">
              <textarea onChange={this.handleComment} id="add-comment" className="form-control fs-5" placeholder="write a comment..."/>
            </div>
            <div className="row mb-4">
               <button onClick={this.handleSubmit} className="btn btn-outline-primary rounded-pill" type="button">
                 Comment
              </button>
              <p className="text-primary text-center mt-3">{this.state.alert}</p>
            </div>

            <div className={styles.commentSection + " comments mt-3 overflow-auto"}>
              {this.state.comments.map(comment => (
                <div key={comment.rate_id} className="card mt-3">
                  <p className="row m-3 mb-0 card-text fs-5">{comment.comment}</p>
                  <p className="row m-2 mt-1 mb-1 card-text justify-content-end"><span className="bi bi-person-circle fs-6">
                    <span className="userName m-2">{comment.username}</span>
                    <span className="m-2">-</span>
                    <span className="timeStamp m-2">{this.getTimeSince(comment.time.split("T")[0])}</span>
                    <a
                      onClick={() => this.postDel(comment.rate_id)}
                      className="text-primary position-absolute end-0 m-3 mt-0">
                      {(comment.user_id === this.state.user_id) ? <i className="bi bi-trash-fill"></i> : null}
                    </a>
                  </span></p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }

  handleComment = (e) => {
    this.setState({comment: e.target.value})
  };

  getUser = async (user_id) => {
    const msg = {
      method: "GET",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token}
    };

    const get = await fetch("/user/" + user_id, msg);
    const res = await get.json();

    return res[0].username;
  }

  postDel = async (rate_id) => {
    const msg = {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token}
    };

    const post = await fetch("/events/" + this.state.event_id + "/reviews/" + rate_id, msg);
    const res = await post.json();

    if (res.response.affectedRows > 0) {
      this.setState({alert: "Comment deleted"});
      const refresh = await this.getReviews()
      this.setState({comments: refresh.sort(function(a,b){return a.time < b.time})});
      this.calcRating();
    }
  }

  postReview = async () => {
    const msg = {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
      body: JSON.stringify({
        comment: this.state.comment,
        rating: this.state.rating,
        time: this.state.time
      })
    };

    const post = await fetch("/events/" + this.state.event_id + "/reviews", msg);
    const res = await post.json();

    return res;
  };

  getReviews = async () => {
    const msg = {
      method: "GET",
      headers: {"Content-Type": "application/json", "Authorization": this.state.token},
    };

    const get = await fetch("/events/" + this.props.data.event_id + "/reviews", msg);
    const res = await get.json();

    return res;
  };

  handleSubmit = async (e) => {
    // Checks for empty fields to prevent empty creations
    if (this.state.comment === "") {
      this.setState({alert: "Your comment is empty"});
      return;
    }

    const res = await this.postReview();

    if (res.err) {
      if (res.err.message)
        this.setState({alert: res.err.message});
      else
        this.setState({alert: res.err})
    }

    if (res.affectedRows > 0) {
      this.setState({alert: "Created comment", refresh: 1});

      const refresh = await this.getReviews();
      if (refresh)
        this.setState({comments: refresh.sort(function(a,b){return a.time < b.time})});
        this.calcRating();
    }
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
  };

  getTimeSince = (time) => {
    time = time.split("-");
    time = time[1] + "/" + time[2] + "/" + time[0]

    const date1 = new Date();
    const date2 = new Date(time);

    const time_dif = date2.getTime() - date1.getTime();
    const days_dif = Math.floor(time_dif / (1000 * 60 * 60 * 24)) * -1;

    if (days_dif === 0)
      return "today"

    if (days_dif === 1)
      return "1 day ago"

    return days_dif + " days ago"
  };

  // Handles the click event for each star and updates the rating
  handleRate = (rate) => {
    // Recreates the stars arr with updated values based on which star is clicked
    const stars = this.state.stars.map((star) => ({
      id: star.id,
      value: star.id <= rate ? 1 : 0,
    }));


    // Updates the rating counts, also accounts for user changing rating by
    // reverting the added rating of previous actions
    this.setState({
      stars: stars,
      rating: rate
    });
  };

  // Returns the formated average rating rounded to one decimal places
  calcAvgRate = () => {
    return (this.state.rating > -1) ? this.state.rating : "Click to Rate"
  };

  // Determines which star icon to use based on star's values
  getStarIcon = (value) => {
    if (value === 0)
      return "bi bi-star";

    return "bi bi-star-fill";
  };

  // Determine the color status of the rating bar based on its avg rating
  getRatingStatus = () => {
    const avg = this.calcAvgRate();

    if (avg < 3) return "danger";
    if (avg < 4) return "warning";

    return "success";
  };

  // Determine the color status of stars based on avg rating
  getStarColor = () => {
    const avg = this.calcAvgRate();

    if (avg < 3) return "rgb(220, 53, 69)";
    if (avg < 4) return "rgb(255, 193, 7)";

    return "rgb(25, 135, 84)";
  };
}

export default EventCard;
