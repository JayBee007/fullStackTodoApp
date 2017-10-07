import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {ListItem, ListContent, Divider, Form, Checkbox, Icon} from 'semantic-ui-react';

const Todo = (props) => {

  const handleCompleteChange = (id,completed) => {
    props.handleCompleteTodo(id,completed)
  }

  const handleDeleteChange = (id) => {
    props.handleDeleteTodo(id);
  }

  const checked = () => {
    if(props.completed) {
      return (
        <Checkbox checked className="checked" onChange={() => handleCompleteChange(props._id,!props.completed)} label={props.text}/>
      );
    }else {
      return (
      <Checkbox onChange={() => handleCompleteChange(props._id,!props.completed)} label={props.text}/>
      );
    }
  }

  return (
    <ListItem>
      <ListContent>
        <Form>
        <Form.Field>
          {checked()}
          {props.completedAt && <p className="short_text">completed At: {moment(props.completedAt).format('LLL')}</p>}
          <div className="action_icons">
            <Link to={`todos/${props._id}`}><Icon style={{cursor:'pointer'}} color="green" size="large" name="edit"/></Link>
            <Icon onClick={() => handleDeleteChange(props._id)} style={{cursor:'pointer'}} color="red" size="large" name="delete"/>
          </div>
        </Form.Field>
        </Form>
      </ListContent>
      <Divider />
    </ListItem>
  );

}

export default Todo;
