import React from "react";
import { Link } from "react-router-dom";

const NotEnoughCards = ({ cards, isDataLoaded }) => {
  return (
    <div>
      <h1>Not enough cards. </h1>
      <p>
        You need at least 3 cards to study. There are{" "}
        {isDataLoaded && cards.cards.length} cards
        {/* this is the same as an if statement */}
        in this deck.
      </p>

      <Link
        to={`/decks/${cards.id}/cards/new`}
        type="button"
        className="btn btn-primary"
      >
        Add Card
      </Link>
    </div>
  );
};

export default NotEnoughCards;
