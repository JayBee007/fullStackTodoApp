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

      localStorage.setItem('x-auth',res.headers['x-auth']);
      history.push('/todos');
    }catch (error) {
      dispatch({
        type: C.AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  }
}

export const loginAction = ({email,password}, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('users/login', {email,password});

      dispatch({type: C.AUTHENTICATED});

      localStorage.setItem('x-auth', res.headers['x-auth']);

      history.push('/todos');
    } catch (error) {
      dispatch({
        type: C.AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  }
}

export function signOutAction() {
  localStorage.removeItem('x-auth');
  return {
    type: C.UNAUTHENTICATED
  };
}
