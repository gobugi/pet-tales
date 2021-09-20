import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import StoryFormPage from './components/StoryFormPage';
import ProfilePage from './components/ProfilePage';
import StoryPage from './components/StoryPage';
import EditStoryForm from './components/EditStoryForm';
import EditCommentForm from './components/EditCommentForm';
import DemoLogin from './components/DemoLogin';

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
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path="/users/:id">
            <ProfilePage />
          </Route>
          <Route exact path="/stories/new">
            <StoryFormPage />
          </Route>
          <Route exact path="/stories/:id/edit">
            <EditStoryForm />
          </Route>
          <Route exact path="/comments/:id/edit">
            <EditCommentForm />
          </Route>
          <Route exact path="/stories/:id">
            <StoryPage />
          </Route>
          <Route exact path="/login/demo">
            <DemoLogin />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
