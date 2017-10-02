import React from 'react';
import {Field, reduxForm} from 'redux-form';

let InputForm = props => {
  const {handleSubmit,submit} = props;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <Field name="text" component="input" type="text" />
      </div>
    </form>
  )
}

InputForm = reduxForm({
  form: 'inputForm'
})(InputForm)

export default InputForm;
