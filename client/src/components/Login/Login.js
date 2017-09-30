import React from 'react';
import LoginForm from './LoginForm';

class Login extends React.Component {
  submit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <LoginForm onSubmit={this.submit} />
    )
  }
}

export default Login;
