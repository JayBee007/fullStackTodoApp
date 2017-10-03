import React, {Component} from 'react';
import {connect} from 'react-redux';

import CenterGrid from '../HoC/CenterGrid';
import {addTodoAction} from '../../redux/actions';
import InputForm from '../Input/InputForm';


class Todos extends Component {
  submit = (values) => {
    this.props.addTodoAction(values);
  }

  render() {
    return (
      <CenterGrid>
        <InputForm onSubmit={this.submit} />
      </CenterGrid>
    );
  }
}

export default connect(null, {addTodoAction})(Todos);
