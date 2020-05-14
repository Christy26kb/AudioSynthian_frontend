import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import navItems from './navItems';

import './styles.css';

const getLocationFromURL = () => {
  const url = window.location.hash;
  const startIndex = url.indexOf('/') + 1;
  const lastURLIndex = url.slice(2).indexOf('/');
  const currentNavItem = url.substring(startIndex, (lastURLIndex === -1 ? url.length : lastURLIndex + 2));
  if (currentNavItem === 'admin') {
    const lastIndex = url.slice(2).indexOf('/', lastURLIndex + 1);
    return url.substring(startIndex, (lastIndex === -1 ? url.length : lastIndex + 2));
  } return currentNavItem;
};

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentNavItem: getLocationFromURL() || 'dashboard'
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.setCurrentNavItem);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.setCurrentNavItem);
  }

  setCurrentNavItem = () => {
    const currentNavItem = getLocationFromURL();
    this.setState({ currentNavItem });
  }

  renderNavItems = navItem => (
    <Menu.Item key={navItem.link}>
      <Link to={navItem.link}>
        <Icon type={navItem.icon} theme="outlined" />
        {navItem.title}
      </Link>
    </Menu.Item>
  );

  render() {
    return (
      <div style={{ height: '100%', width: '20%' }}>
        <Menu
          style={{ width: '100%', height: '100%' }}
          defaultSelectedKeys={[`${this.state.currentNavItem}`]}
          mode="inline"
          theme="light"
        >
          {navItems.map(this.renderNavItems)}
        </Menu>
      </div>
    );
  }
}

export default Navbar;
