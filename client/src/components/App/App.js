import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ReqAuth from '../HoC/ReqAuth';
import NoReqAuth from '../HoC/NoReqAuth';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Todos from '../Todos/Todos';
import EditTodoContainer from '../Todo/EditTodoContainer';
import Main from '../Main/Main';

import Nav from '../Nav/Nav'

class App extends Component {
  render() {
    return (
      <Container style={{paddingTop:'70px'}}>
        <Nav />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/todos" exact component={ReqAuth(Todos)} />
          <Route path="/todos/:id" exact component={ReqAuth(EditTodoContainer)} />
          <Route path="/login" exact component={NoReqAuth(Login)} />
          <Route path="/signup" exact component={NoReqAuth(Signup)} />
        </Switch>

      </Container>
    );
  }
}

export default App;
