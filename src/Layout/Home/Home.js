import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeckInfo from "../Decks/DeckInfo";
import { listDecks } from "../../utils/api";

const Home = () => {
  const [decks, setDecks] = useState([]);

  //pulls the deck information so we can see it in the console
  useEffect(() => {
    setDecks([]);

    const abortController = new AbortController();

    async function loadDecks() {
      try {
        let _decks = await listDecks(abortController.signal);
        setDecks(_decks);

        console.log(_decks);
      } catch (error) {
        console.log(error.message);
      }
    }
    loadDecks();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, []);

  const ShowDeck = () => {
    return decks.map((deck) => {
      //making a new component of each deck in DeckInfo
      return (
        <DeckInfo key={deck.id} deck={deck} decks={decks} setDecks={setDecks} />
      );
    });
  };

  return (
    <div>
      {/* a link is a button essentially so you don't have to have button tag */}
      <Link to="/decks/new" className="btn btn-secondary">
        <span>&#43;</span> <span></span>Create Deck
      </Link>
      <div>
        {/* <DeckInfo /> replacing with the ShowDeck function we made*/}
        {ShowDeck()}
      </div>
    </div>
  );
};

export default Home;
