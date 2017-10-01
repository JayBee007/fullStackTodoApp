import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import ReqAuth from '../HoC/ReqAuth';
import NoReqAuth from '../HoC/NoReqAuth';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Todos from '../Todos/Todos';

import Nav from '../Nav/Nav'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Nav />
        <Route path="/todos" component={ReqAuth(Todos)} />
        <Route path="/login" component={NoReqAuth(Login)} />
        <Route path="/signup" component={NoReqAuth(Signup)} />
      </div>
    );
  }
}

export default App;
