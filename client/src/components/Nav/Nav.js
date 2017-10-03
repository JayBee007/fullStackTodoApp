import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

import {signOutAction} from '../../redux/actions';

class Nav extends Component {
  navbarLinks() {
    if(this.props.auth) {
      return (
        <Menu attached="top">
          <Menu.Item position="right">
          <Link to="/login" onClick={this.props.signOutAction}>Logout</Link>
          </Menu.Item>
        </Menu>
      );
    }

    return (
    <Menu fixed="top" inverted borderless size="massive">
      <Menu.Item position="right">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/signup">Signup</Link>
      </Menu.Item>
    </Menu>
    );
  }

  render() {
    return (
        this.navbarLinks()
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
  };
}

export default connect(mapStateToProps, {signOutAction})(Nav);
