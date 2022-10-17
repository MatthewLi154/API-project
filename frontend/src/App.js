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
import SetGroupLocation from "./components/CreateGroup/SetGroupLocation";
import SetGroupName from "./components/CreateGroup/SetGroupName";
import SetGroupDescription from "./components/CreateGroup/SetGroupDescription";

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
          <Route path="/groups/create/setDescription">
            <SetGroupDescription />
          </Route>
          <Route path="/groups/create/setLocation">
            <SetGroupLocation />
          </Route>
          <Route path="/groups/create/setName">
            <SetGroupName />
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
