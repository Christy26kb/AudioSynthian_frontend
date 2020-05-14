import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Exam from '../containers/exam';

import './styles.css';

class NoNavbarLayout extends Component {
  render() {
    return (
      <div className="main-layout">
        <Switch>
          <Route exact={true} path="/exam" component={Exam} />
          {/* NoNavbar layout based components */}
        </Switch>
      </div>
    );
  }
}

export default NoNavbarLayout;
