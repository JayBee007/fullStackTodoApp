import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'semantic-ui-react';

import CenterGrid from '../HoC/CenterGrid';
import Todo from '../Todo/Todo';
import InputForm from '../Input/InputForm';
import {addTodoAction, fetchTodosAction,deleteTodoAction, completeTodoAction} from '../../redux/actions';
import './Todos.css';

class Todos extends Component {
  submit = (values) => {
    this.props.addTodoAction(values);
  }

  componentDidMount() {
    this.props.fetchTodosAction();
  }

  loadTodos = () => {
    return this.props.todos.map((todo) => {
      return (<Todo key={todo._id}
                handleCompleteTodo={this.props.completeTodoAction}
                handleDeleteTodo={this.props.deleteTodoAction} {...todo} />)
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
export default connect(mapStateToProps,{addTodoAction,fetchTodosAction,deleteTodoAction, completeTodoAction})(Todos);
