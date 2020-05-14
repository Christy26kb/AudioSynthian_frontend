import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../containers/navbar';
import Dashboard from '../containers/dashboard';
import Preferences from '../containers/preferences';
import Candidates from '../containers/candidates';

import './styles.css';

class MainLayout extends Component {
  render() {
    return (
      <div className="main-layout">
        <Navbar />
        <div className="content-wrapper p-0 col-13">
          <Switch>
            <Route exact={true} path="/dashboard" component={Dashboard} />
            <Route exact={true} path="/preferences" component={Preferences} />
            <Route exact={true} path="/candidates" component={Candidates} />
            {/* Need to add more main route components with navbar */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default MainLayout;
