import React from "react";

class Ratings extends React.Component {
  state = {
    stars: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
    ],
    totalRatings: this.props.totalRatings,
    numRatings: this.props.numRatings,
    fontSize: this.props.fontSize,
    localRating: 0,
  };

  componentDidUpdate(prev) {
    if (prev.totalRatings !== this.props.totalRatings)
      this.setState({
        totalRatings: this.props.totalRatings,
        numRatings: this.props.numRatings
      })
  }

  render() {
    return (
      <div style={{"fontSize": this.state.fontSize}}className=" star-meter">
        {this.state.stars.map((star) => (
          <span
            style={{ color: this.getStarColor() }}
            key={star.id}
            className={this.getStarIcon(star.value) + " m-2"}
          ></span>
        ))}

        <span className={"m-3 badge bg-" + this.getRatingStatus()}>
          <span className="bi bi-star-fill m-2"></span>
          {this.calcAvgRate()}
        </span>
      </div>
    );
  }

  // Handles the click event for each star and updates the rating
  handleRate = (id) => {
    // Recreates the stars arr with updated values based on which star is clicked
    const stars = this.state.stars.map((star) => ({
      id: star.id,
      value: star.id <= id ? 1 : 0,
    }));

    // Updates the rating counts, also accounts for user changing rating by
    // reverting the added rating of previous actions
    this.setState({
      stars: stars,
      totalRatings: this.state.totalRatings - this.state.localRating + id,
      numRatings:
        this.state.numRatings + (this.state.localRating === 0 ? 1 : 0),
      localRating: id,
    });
  };

  // Returns the formated average rating rounded to one decimal places
  calcAvgRate = () => {
    if (this.state.numRatings === 0) return "Not Yet Rated";

    const avg = this.state.totalRatings / this.state.numRatings;
    return Math.round(avg * 10) / 10;
  };

  // Determines which star icon to use based on star's values
  getStarIcon = (value) => {
    if (value === 0) return "bi bi-star";

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

export default Ratings;
