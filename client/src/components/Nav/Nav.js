import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {signOutAction} from '../../redux/actions';

import './Nav.css';

class Nav extends Component {
  navbarLinks() {
    if(this.props.auth) {
      return (
        <ul>
          <li><Link to="/login" onClick={this.props.signOutAction}>Logout</Link></li>
        </ul>
      );
    }

    return (
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    );
  }

  render() {
    return (
      <nav>
        {this.navbarLinks()}
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
  };
}

export default connect(mapStateToProps, {signOutAction})(Nav);
