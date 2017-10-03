import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormField,Input} from 'semantic-ui-react';

let InputForm = props => {
  const {handleSubmit,submit} = props;

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormField>
        <Input>
          <Field placeholder="Add ToDo" name="text" component="input" type="text" />
        </Input>
      </FormField>
    </Form>
  );
}

InputForm = reduxForm({
  form: 'inputForm'
})(InputForm)

export default InputForm;
