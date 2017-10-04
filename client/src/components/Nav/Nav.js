import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

import {signOutAction} from '../../redux/actions';

class Nav extends Component {
  navbarLinks() {
    if(this.props.auth) {
      return (
        <Menu fixed="top" inverted borderless size="massive">
          <Menu.Item position="right">
            <NavLink to="/login" onClick={this.props.signOutAction}>Logout</NavLink>
          </Menu.Item>
        </Menu>
      );
    }

    return (
    <Menu fixed="top" inverted borderless size="massive">
      <Menu.Item position="right">
        <NavLink to="/login">Login</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/signup">Signup</NavLink>
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
