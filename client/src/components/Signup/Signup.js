import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Segment, Icon} from 'semantic-ui-react';

import CenterGrid from '../HoC/CenterGrid';
import {signUpAction} from '../../redux/actions';
import SignupForm from './SignupForm';

class Signup extends React.Component {
  submit = (values) => {
    this.props.signUpAction(values,this.props.history);
  }

  render() {
    return (
      <CenterGrid>
        <Segment>
        <Link to='/'><Icon className="close__form" name="remove" size="large" /></Link>
          <h1>Signup</h1>
          <SignupForm onSubmit={this.submit} />
        </Segment>
      </CenterGrid>
    );
  }
}

export default connect(null,{signUpAction})(Signup);
