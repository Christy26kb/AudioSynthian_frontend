import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './styles.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onLogin = () => {
    const { username, password } = this.state;
    this.props.onAdminLogin(username, password);
  };

  onChange = (event) => {
    const { target: { value, name } } = event;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="full-content d-flex-center flex-column">
        <Avatar
          size={88}
          icon={<UserOutlined />}
          className="mb-4"
          style={{ backgroundColor: '#40a9ff' }}
        />
        <div className="login-actions mt-4" style={{ width: 300 }}>
          <Input
            placeholder="Username"
            name="username"
            style={{ margin: 10 }}
            value={username}
            onChange={this.onChange}
          />
          <Input.Password
            placeholder="Password"
            name="password"
            style={{ margin: 10 }}
            value={password}
            onChange={this.onChange}
          />
          <Button
            type="primary"
            size="large"
            loading={false}
            style={{ width: 300, marginTop: 10 }}
            onClick={this.onLogin}
            disabled={!(username && password)}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onAdminLogin: PropTypes.func.isRequired
};

export default Login;
