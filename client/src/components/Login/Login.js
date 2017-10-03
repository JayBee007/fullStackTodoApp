import React from 'react';
import {connect} from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react'

import LoginForm from './LoginForm';
import {loginAction} from '../../redux/actions';

class Login extends React.Component {
  submit = (values) => {
    this.props.loginAction(values,this.props.history);
  }

  render() {
    return (
      <Grid columns={2} centered doubling>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <h1>Login</h1>
              <LoginForm onSubmit={this.submit} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(null,{loginAction})(Login);
