import React from "react";
import { Link} from "react-router-dom";


const Form = ({formSubmit, cardFormData, updateCardForm, deckId}) => {
  return (
      <form onSubmit={formSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="Make a question about the topic you want to study."
            value={cardFormData.front}
            onChange={updateCardForm}
          ></textarea>

          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            placeholder="What is the answer to the question you made above?"
            value={cardFormData.back}
            onChange={updateCardForm}
          ></textarea>
          <button type="submit" className="btn btn-primary mx-2 my-2">
            Submit
          </button>
          <Link
            to={`/decks/${deckId}/`}
            type="button"
            className="btn btn-secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
  );
};

export default Form;
