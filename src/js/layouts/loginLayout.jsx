import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../containers/login';
import CandidateSignup from '../containers/candidates/components/register';

import './styles.css';

class LoginLayout extends Component {
  render() {
    return (
      <div className="main-layout">
        <Switch>
          <Route path="/login" component={Login} exact={true} />
          <Route path="/candidate_registration" component={CandidateSignup} exact={true} />
          {/* Need to add more login level routes */}
        </Switch>
      </div>
    );
  }
}

export default LoginLayout;
