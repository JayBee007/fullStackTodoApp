import React from 'react';
import {Field, reduxForm} from 'redux-form';

let LoginForm = props => {
  const {handleSubmit,submit} = props;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="email">E-mail</label>
        <Field name="email" component="input" type="text" />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <Field name="password" component="input" type="password" />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)

export default LoginForm;
