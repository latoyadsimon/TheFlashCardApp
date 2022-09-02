import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import CreateDeck from "./Decks/CreateDeck";
import DeckRoutes from "./Decks/DeckRoutes";


function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckRoutes />
          </Route>
          <Route path="/">
            {/* why is this set to home? */}
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
