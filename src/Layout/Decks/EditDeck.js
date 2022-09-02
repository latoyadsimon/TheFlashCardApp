import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

const EditDeck = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function getDecks() {
      try {
        let _decks = await readDeck(deckId, abortController.signal);
        setFormData(_decks); //needed to change this from setDecks(_decks) to get info to load on the edit screen.
        //console.log(_decks);
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

  const updateForm = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const editFormSubmit = async (event) => {
    event.preventDefault();
    const response = await updateDeck(formData);
    history.push(`/decks/${response.id}`);
  };

  return (
    <div>
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
                {"  Home"}
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}/`}>{formData.name}</Link>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form onSubmit={editFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Deck Name"
              value={formData.name}
              onChange={updateForm}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              id="description"
              placeholder="Brief description of the deck"
              value={formData.description}
              onChange={updateForm}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary my-2 mx-2">
            Submit
          </button>
          <Link
            to={`/decks/${deckId}/`}
            type="button"
            className="btn btn-secondary my-2 mx-2"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditDeck;
