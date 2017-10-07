import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormField, Input, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

let EditTodoForm = props => {
  const {handleSubmit,submit} = props;

  return(
    <Form onSubmit={handleSubmit(submit)}>
    <FormField>
      <Input><Field name="todo" component="input" type="text" placeholder={props.todo} /></Input>
    </FormField>
    <Button primary type='submit'>Edit</Button>
    <Link to="/todos"><Button color="vk" type='submit'>Cancel</Button></Link>
  </Form>
  )
}

EditTodoForm = reduxForm({
  form: 'editForm'
})(EditTodoForm)

export default EditTodoForm;
