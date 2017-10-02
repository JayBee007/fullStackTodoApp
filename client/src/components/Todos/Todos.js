import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addTodoAction} from '../../redux/actions';
import InputForm from '../Input/InputForm';


class Todos extends Component {
  submit = (values) => {
    this.props.addTodoAction(values);
  }

  render() {
    return (
      <InputForm onSubmit={this.submit} />
    )
  }
}

export default connect(null, {addTodoAction})(Todos);
