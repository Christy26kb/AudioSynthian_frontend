import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from './mainLayout';
import NoNavbarLayout from './noNavbarLayout';

class ProtectedLayout extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <>
        {currentUser && currentUser.id ? (
          <Route>
            <Switch>
              <Redirect from="/" to="/dashboard" exact={true} />
              <Route path="/exam" component={NoNavbarLayout} exact={true} />
              {/* Need to add components which had no navbar */}
              <Route path="*" component={MainLayout} exact={true} />
            </Switch>
          </Route>
        ) : (
          <Redirect from="*" to="/login" />
        )}
      </>);
  }
}

const mapStateToProps = state => ({
  currentUser: state.app.currentUser
});

ProtectedLayout.propTypes = {
  currentUser: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, null)(ProtectedLayout);
