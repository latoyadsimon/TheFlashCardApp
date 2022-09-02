import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import FlashCards from "./FlashCards";
import NotEnoughCards from "./NotEnoughCards";

const StudyCard = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState(0);
  const { name } = cards;

  const [isDataLoaded, setIsDataLoaded] = useState(false);

 

  useEffect(() => {
    const abortController = new AbortController();

    async function loadCards() {
      try {
        let _cards = await readDeck(deckId, abortController.signal);
        setCards(_cards);
        setIsDataLoaded(true);
        console.log("this is deck", _cards);
        console.log("this is the decks name", _cards.name);
        console.log("these are the cards", _cards.cards);
        console.log("this is how many cards there are", _cards.cards.length);
      } catch (error) {
        console.log(error.message);
      }
    }
    loadCards();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, [deckId]);

  //making a new component of each deck in FlashCards

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-house-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                />
              </svg>
              {" Home"}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}/`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {name}</h1>

      {/* isDataLoaded must be true before it continues, then depending on how many cards are in the deck will determine if it goes on to show which screen component. */}
      {isDataLoaded && cards.cards.length > 2 ? (
        <FlashCards cards={cards} cardId={cardId} setCardId={setCardId} />
      ) : (
        <NotEnoughCards cards={cards} isDataLoaded={isDataLoaded} />
      )}
    </div>
  );
};

export default StudyCard;
