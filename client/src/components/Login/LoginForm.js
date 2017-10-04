import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Form, FormField, Input, Button} from 'semantic-ui-react';

let LoginForm = props => {
  const {handleSubmit,submit} = props;

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormField>
        <label htmlFor="email">E-mail</label>
        <Input><Field name="email" component="input" type="text" /></Input>
      </FormField>
      <FormField>
        <label htmlFor="password">Password</label>
        <Input><Field name="password" component="input" type="password" /></Input>
      </FormField>
      <Button primary type='submit'>Login</Button>
    </Form>
  );
}

LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)

export default LoginForm;
