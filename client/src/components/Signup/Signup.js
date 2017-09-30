import React from 'react';
import {connect} from 'react-redux';

import {signUpAction} from '../../redux/actions';
import SignupForm from './SignupForm';

class Signup extends React.Component {
  submit = (values) => {
    this.props.signUpAction(values,this.props.history);
  }

  render() {
    return (
      <SignupForm onSubmit={this.submit} />
    )
  }
}

export default connect(null,{signUpAction})(Signup);
