import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFound from "../NotFound";
import StudyCard from "./StudyCard";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import DeckDetails from "./DeckDetails";

//useRouteMatch - grabs the url you are hitting and stores it in a variable called url
//ex. google.com = url

//started by making a route to all the pages that were initially asked for to build from here
function DeckRoutes() {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact={true} path="/decks/:deckId">
        <DeckDetails />
      </Route>
      <Route exact={true} path="/decks/:deckId/study">
        <StudyCard />
      </Route>
      <Route exact={true} path="/decks/:deckId/edit">
        <EditDeck />
      </Route>
      <Route exact={true} path="/decks/:deckId/cards/new">
        <AddCard />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard />
      </Route>
      <Route path={url}>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default DeckRoutes;
