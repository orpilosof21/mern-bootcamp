import React from 'react';
import {Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

export interface IRouteParams{
  userId:string,
}

const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Redirect to="/"/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
