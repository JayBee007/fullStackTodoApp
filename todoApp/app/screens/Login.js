import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from '../components/Container/Container'

class Login extends Component {
  render() {
    return (
      <Container>
        <Text style={{color:'white'}}>
          Login Form
        </Text>
      </Container>
    );
  }
}

export default Login;
