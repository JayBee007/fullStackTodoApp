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

      // history.push('/todos');
    } catch (error) {
      dispatch({
        type: C.AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  }
}

export function signOutAction() {
  const token = localStorage.getItem('x-auth');
  const options = {
    headers: {
      'x-auth': token
    }
  };
  return async (dispatch) => {
    try{
      const res = await axios.delete(`users/me/token`, options);

      if(res.status === 200) {
        dispatch({type: C.UNAUTHENTICATED});
      }else {
        dispatch({
          type: C.AUTHENTICATION_ERROR,
          payload: "No such user"
        });
      }

      localStorage.removeItem('x-auth');

    }catch (error) {
      dispatch({
        type: C.AUTHENTICATION_ERROR,
        payload: "Already signed out"
      });
    }
  }
}
