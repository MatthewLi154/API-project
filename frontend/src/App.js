import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";
import SignupFormPage from "./components/SignupFormModal/SignUpForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home/index";
import Groups from "./components/Groups/index";
import SingleGroup from "./components/SingleGroup";
import CreateGroup from "./components/CreateGroup";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/register">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/groups/create">
            <CreateGroup />
          </Route>
          <Route path="/groups/:id">
            <SingleGroup />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
