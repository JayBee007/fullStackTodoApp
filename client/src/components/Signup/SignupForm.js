import React from 'react';
import {Field, reduxForm} from 'redux-form';

let SignupForm = props => {
  const {handleSubmit} = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">E-mail</label>
        <Field name="email" component="input" type="text" />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <Field name="password" component="input" type="password" />
      </div>

      <button type="submit">Signup</button>
    </form>
  )
}

SignupForm = reduxForm({
  form: 'signupForm'
})(SignupForm)

export default SignupForm;
