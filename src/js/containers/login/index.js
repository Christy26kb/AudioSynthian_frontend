import { connect } from 'react-redux';
import Login from './login';

const mapStateToProps = state => ({
  currentUser: state.app.currentUser
});

const mapDispatchToProps = dispatch => ({
  onAdminLogin: (username, password) => {
    dispatch({ type: 'CURRENT_USER:FETCH', username, password });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
