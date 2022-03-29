import React from "react";
import Card from "./card";

class Dashboard extends React.Component {
  constructor() {
    super();

    const numCards = 6;
    let cardIds = [];

    for (let i = 0; i < numCards; i++) cardIds.push(i);
    this.state = { cardIds: cardIds };
  }

  render() {
    return (
      <div className={"d-flex flex-wrap"}>
        {this.state.cardIds.map((id) => (
          <Card className={""} key={id} cardId={id} />
        ))}
      </div>
    );
  }
}

export default Dashboard;
