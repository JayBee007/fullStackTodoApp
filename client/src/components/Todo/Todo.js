import React from 'react';
import {ListItem, ListContent, Divider, Form, Checkbox, Icon} from 'semantic-ui-react';

const Todo = (props) => {
  const handleCompleteChange = () => {
    console.log("checked");
  }
  const handleEditChange = () => {
    console.log("edit");
  }

  const handleDeleteChange = () => {
    console.log("delete");
  }
  return (
    <ListItem>
      <ListContent>
        <Form>
        <Form.Field>
          <Checkbox onChange={handleCompleteChange} label={props.text}/>
          <div style={{float:'right'}}>
            <Icon onClick={handleEditChange} style={{cursor:'pointer'}} color="green" size="large" name="edit"/>
            <Icon onClick={handleDeleteChange} style={{cursor:'pointer'}} color="red" size="large" name="delete"/>
          </div>
        </Form.Field>
        </Form>
      </ListContent>
      <Divider />
    </ListItem>
  )
}

export default Todo;
