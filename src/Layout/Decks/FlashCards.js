import React, { useState} from "react";
import { useHistory } from "react-router-dom";

const FlashCards = ({ cardId, cards, setCardId }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();

  //this function will make the next button work and give the reset prompt when it reaches the end of the deck
  const handleNextBtn = () => {
    if (cardId >= cards.cards.length - 1) {
      if (window.confirm("Reset Cards?")) {
        setCardId(0);
      } else {
        history.push("/");
      }
    } else {
      setCardId(cardId + 1);
      setIsFlipped(false);
    }
  };

  //this will let us know if the card is flipped or not
  const FlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card mt-3 mb-4">
      <div className="card-body">
        <h5 className="card-title">
          Card {cardId + 1} of {cards.cards.length}
        </h5>
        <p className="card-text">
          {/* depending on whether isFlipped is true or not will decide which page shows */}
          {isFlipped ? cards.cards[cardId].back : cards.cards[cardId].front}
        </p>
        <button
          onClick={FlipCard}
          type="button"
          className="btn btn-secondary my-2 mx-2"
        >
          Flip
        </button>
        {isFlipped && (
          <button
            onClick={handleNextBtn}
            type="button"
            className="btn btn-primary my-2 mx-2"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FlashCards;
