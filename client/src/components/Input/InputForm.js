import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormField,Input} from 'semantic-ui-react';

const InputField = (props) => {
  return (
    <Input icon="add to calendar" {...props}/>
  );
}

let InputForm = props => {
  const {handleSubmit,submit} = props;

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormField>
          <Field placeholder="Add ToDo" name="text" component={InputField} type="text" />
      </FormField>
    </Form>
  );
}

InputForm = reduxForm({
  form: 'inputForm'
})(InputForm)

export default InputForm;
