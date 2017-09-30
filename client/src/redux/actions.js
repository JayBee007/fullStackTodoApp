import C from './constants';
import axios from 'axios';

export const addTodo = text => {
  return {
    type: C.ADD_TODO,
    text
  }
}

export const signUpAction = ({email,password}, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('users', {email,password});

      dispatch({type: C.AUTHENTICATED});
      console.log(res);
      localStorage.setItem('user',res.headers['x-auth']);
      // history.push('/todos')
    }catch (error) {
      dispatch({
        type: C.AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  }
}
