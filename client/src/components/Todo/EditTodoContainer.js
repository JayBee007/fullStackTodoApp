import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import CenterGrid from '../HoC/CenterGrid';
import EditTodoForm from './EditTodoForm';
import {fetchTodoAction, editTodoAction} from '../../redux/actions';

class EditTodoContainer extends React.Component {
  state = {
    redirect:false
  }
  submit = (values) => {
    this.props.editTodoAction(this.props.match.params.id,values.todo);
    this.setState({
      redirect:true
    })
  }

  componentDidMount() {
    this.props.fetchTodoAction(this.props.match.params.id);
  }

  render() {
    if(this.state.redirect) {
      return (
        <Redirect push to="/todos" />
      );
    }
    return (
      <CenterGrid>
        <div className="mainContent">
          <h1>Edit Todo</h1>
          <EditTodoForm onSubmit={this.submit} todo={this.props.todo} />
        </div>
      </CenterGrid>
    );
  };
}

function mapStateToProps(state) {
  return {
    todo:state.todo
  }
}


export default connect(mapStateToProps,{editTodoAction,fetchTodoAction})(EditTodoContainer);
