import request from '../util/util';
import C from './constants';


export const addTodo = (text,id,completed,completedAt) => {

  return {
    type: C.ADD_TODO,
    text,
    id,
    completed,
    completedAt
  }
}

export const fetchTodo = (todos) => {

  return {
    type: C.FETCH_TODO,
    todos
  }
}

export const authAction = (email,id) => {
  return {
    type: C.USER_DATA,
    email,
    id
  }
}

export const addTodoAction = ({text}) => {

  return async (dispatch) => {
    try {
      const res = await request.post('todos', {text});
      if(res.status === 200) {

        dispatch(addTodo(res.data.text,res.data._id, res.data.completed,res.data.completedAt));
      }

    }catch(error) {
      console.log(error);
    }
  }
}

export const fetchTodoAction = () => {

  return async (dispatch) => {
    try{
      const res = await request.get('todos');

        dispatch(fetchTodo(res.data.todos));

    }catch(error) {
      console.log(error);
    }
  }
}

export const signUpAction = ({email,password}, history) => {
  return async (dispatch) => {
    try {
      const res = await request.post('users', {email,password});

      dispatch({type: C.AUTHENTICATED});

      localStorage.setItem('x-auth',res.headers['x-auth']);
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
      const res = await request.post('users/login', {email,password});

      if(res.status === 200) {
        localStorage.setItem('x-auth', res.headers['x-auth']);
        localStorage.setItem('userEmail', res.data.email);
        localStorage.setItem('userId', res.data._id);
      }

      dispatch({type: C.AUTHENTICATED});



      dispatch(authAction(res.data.email,res.data._id));

    } catch (error) {
      dispatch({
        type: C.AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  }
}

export function signOutAction() {

  return async (dispatch) => {
    try{
      const res = await request.delete(`users/me/token`);

      if(res.status === 200) {
        localStorage.removeItem('x-auth');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        dispatch({type: C.UNAUTHENTICATED});
      }else {
        dispatch({
          type: C.AUTHENTICATION_ERROR,
          payload: "No such user"
        });
      }

    }catch (error) {
      dispatch({
        type: C.AUTHENTICATION_ERROR,
        payload: "Already signed out"
      });
    }
  }
}

export function deleteTodoAction(id) {

  return async (dispatch) => {
    try {
      const res = await request.delete(`todos/${id}`);
      console.log('deleteTodoAction',res);

      if(res.status === 200) {
        dispatch({type:C.DELETE_TODO,id});
      }

    }catch(error) {
      console.log(error);
    }
  }
}
