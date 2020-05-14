import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from './mainLayout';
import NoNavbarLayout from './noNavbarLayout';

class ProtectedLayout extends React.Component {
  render() {
    return (
      <Route>
        <Switch>
          <Redirect from="/" to="/dashboard" exact={true} />
          <Route path="/exam" component={NoNavbarLayout} exact={true} />
          {/* Need to add components which had no navbar */}
          <Route path="*" component={MainLayout} exact={true} />
        </Switch>
      </Route>);
  }
}

export default ProtectedLayout;
