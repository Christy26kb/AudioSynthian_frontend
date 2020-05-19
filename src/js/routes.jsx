import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginLayout from './layouts/loginLayout';
import ProtectedLayout from './layouts/protectedLayout';

export default (
  <Route>
    <Switch>
      <Redirect from="/" to="/login" exact={true} />
      <Route path="/login" component={LoginLayout} exact={true} />
      <Route path="/candidate_registration" component={LoginLayout} exact={true} />
      {/* Need to add login based routes here */}
      <Route path="*" component={ProtectedLayout} exact={true} />
    </Switch>
  </Route>
);
