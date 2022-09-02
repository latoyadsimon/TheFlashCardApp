import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import Form from "./Form";

const AddCard = () => {
  const { deckId } = useParams();
  const [decks, setDecks] = useState({});
  const [cardFormData, setCardFormData] = useState({ front: "", back: "" });

  useEffect(() => {
    const abortController = new AbortController();

    async function getDecks() {
      try {
        // listDecks brings all the decks, readDeck reads the specified deck with the deckId
        let _decks = await readDeck(deckId, abortController.signal);
        setDecks(_decks);

        // //making sure the information is loading on the screen
        //  console.log("this is a deck", _decks);
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

  // //making sure the state of decks has changed
  // console.log("now the deck state is:", decks);

  //updates the state adding the new information to the current info
  const updateCardForm = (event) => {
    const { name, value } = event.target;
    setCardFormData({ ...cardFormData, [name]: value });
  };

  //updates the information to the api
  const formSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, cardFormData);

    setCardFormData({ front: "", back: "" });
  };

  // //confirming what will be shown when these variables are called
  // console.log("this is deckId", deckId);
  // console.log("this is decks", decks);

  return (
    <div>
      {/* <div>This is the add card page</div> */}
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
              {"  Home"}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}/`}>{decks.name}</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{`${decks.name}: Add Card`}</h1>
      <Form formSubmit={formSubmit} cardFormData={cardFormData} updateCardForm={updateCardForm} deckId={deckId}/>
    </div>
  );
};

export default AddCard;
