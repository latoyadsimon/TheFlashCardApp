import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import Form from "./Form";

const EditCard = () => {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  //console.log("deckId:", deckId, "cardId:", cardId);

  const [cardFormData, setCardFormData] = useState({ front: "", back: "" });
  const [decks, setDecks] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function getDecks() {
      try {
        let _decks = await readDeck(deckId, abortController.signal);
        setDecks(_decks);
        console.log("this printed the deck", _decks);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDecks();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();

    async function getCards() {
      try {
        let _cards = await readCard(cardId, abortController.signal);
        setCardFormData(_cards); //needed to change this from setDecks(_decks) to get info to load on the edit screen.
        //console.log("is this printed", _cards);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCards();
    return () => {
      console.info("aborting");
      abortController.abort();
    };
  }, [cardId]);

  const updateCardForm = (event) => {
    const { name, value } = event.target;
    setCardFormData({ ...cardFormData, [name]: value });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    // const response = await updateCard(cardFormData);
     await updateCard(cardFormData);

    setCardFormData({ front: "", back: "" });
    history.push(`/decks/${deckId}`);
  };

  //console.log("this is my cards array", decks.cards);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}/`}>{decks.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {/* {`Edit Card ID: ${cardId}`} */}
 {`Edit Card`}
          </li>
        </ol>
      </nav>
      {/* <div>This is the add card page</div> */}
      <h1>{`${decks.name}: Edit Card`}</h1>
      <Form formSubmit={formSubmit} cardFormData={cardFormData} updateCardForm={updateCardForm} deckId={deckId}/>
    </div>
  );
};

export default EditCard;
