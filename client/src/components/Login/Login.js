import React from 'react';
import {connect} from 'react-redux';

import LoginForm from './LoginForm';
import {loginAction} from '../../redux/actions';

class Login extends React.Component {
  submit = (values) => {
    this.props.loginAction(values,this.props.history);
  }

  render() {
    return (
      <LoginForm onSubmit={this.submit} />
    )
  }
}

export default connect(null,{loginAction})(Login);
