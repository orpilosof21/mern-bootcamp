import React from 'react';
import {Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
        <Route path="/" exact>
          <Users />
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
