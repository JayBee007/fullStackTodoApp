import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Icon } from 'semantic-ui-react'

import CenterGrid from '../HoC/CenterGrid';
import LoginForm from './LoginForm';
import {loginAction} from '../../redux/actions';

class Login extends React.Component {
  submit = (values) => {
    this.props.loginAction(values,this.props.history);
  }

  render() {
    return (
      <CenterGrid>
        <Segment>
          <Link to='/'><Icon className="close__form" name="remove" size="large" /></Link>
          <h1>Login</h1>
          <LoginForm onSubmit={this.submit} />
        </Segment>
      </CenterGrid>
    );
  }
}

export default connect(null,{loginAction})(Login);
