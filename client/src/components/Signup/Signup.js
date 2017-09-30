import React from 'react';
import SignupForm from './SignupForm';

class Signup extends React.Component {
  submit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <SignupForm onSubmit={this.submit} />
    )
  }
}

export default Signup;
