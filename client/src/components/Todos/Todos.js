import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'semantic-ui-react';

import CenterGrid from '../HoC/CenterGrid';
import Todo from '../Todo/Todo';
import InputForm from '../Input/InputForm';
import {addTodoAction, fetchTodoAction} from '../../redux/actions';
import './Todos.css';

class Todos extends Component {
  submit = (values) => {
    this.props.addTodoAction(values);
  }

  componentDidMount() {
    this.props.fetchTodoAction();
  }

  loadTodos = () => {
    return this.props.todos.map((todo) => {
      return (<Todo key={todo._id} {...todo} />)
    });
  }

  render() {
    return (
      <CenterGrid>
        <div className="mainContent">
          <InputForm onSubmit={this.submit} />
          <List>
            {this.loadTodos()}
          </List>
        </div>

      </CenterGrid>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos:state.todos
  }
}
export default connect(mapStateToProps,{addTodoAction,fetchTodoAction})(Todos);
