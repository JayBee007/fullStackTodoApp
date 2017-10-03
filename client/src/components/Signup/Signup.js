import React from 'react';
import {connect} from 'react-redux';
import {Grid, Segment} from 'semantic-ui-react';

import {signUpAction} from '../../redux/actions';
import SignupForm from './SignupForm';

class Signup extends React.Component {
  submit = (values) => {
    this.props.signUpAction(values,this.props.history);
  }

  render() {
    return (
      <Grid columns={2} centered doubling>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <h1>Signup</h1>
            <SignupForm onSubmit={this.submit} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}

export default connect(null,{signUpAction})(Signup);
