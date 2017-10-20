// import request, {setAuthToken} from '../util/util';
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

export const addCounterAction = () => {
  return {
    type: C.ADD_COUNTER
  }
}

export const fetchTodos = (todos) => {
  return {
    type: C.FETCH_TODOS,
    todos
  }
}

export const fetchTodo = (todo) => {
  return {
    type: C.FETCH_TODO,
    todo
  }
}

export const authAction = (email,id) => {
  return {
    type: C.ADD_USER_DATA,
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

export const fetchTodosAction = () => {

  return async (dispatch) => {
    try{
      const res = await request.get('todos');

        dispatch(fetchTodos(res.data.todos));

    }catch(error) {
      console.log(error);
    }
  }
}

export const fetchTodoAction = (id) => {

  return async (dispatch) => {
    try {
      const res = await request.get(id)
      dispatch(fetchTodo(res.data.todo.text));
    }catch(error) {
      console.log(error);
    }
  }



}

export const signUpAction = ({email,password}, history) => {
  return async (dispatch) => {
    try {
      const res = await request.post('users', {email,password});

      localStorage.setItem('x-auth',res.headers['x-auth']);
      setAuthToken(localStorage.getItem('x-auth'))
      dispatch({type: C.AUTHENTICATED});
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

      setAuthToken(localStorage.getItem('x-auth'));

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
        setAuthToken();
        dispatch({type: C.UNAUTHENTICATED});
        dispatch({type: C.REMOVE_TODOS});
        dispatch({type: C.REMOVE_USER_DATA});
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

      if(res.status === 200) {
        dispatch({type:C.DELETE_TODO,id});
      }

    }catch(error) {
      console.log(error);
    }
  }
}

export function completeTodoAction(id,completed) {
  return async (dispatch) => {
    try {
      const res = await request.patch(`todos/${id}`, {completed});
      const completedAt = res.data.todo.completedAt;
      if(res.status === 200) {
        dispatch({type:C.COMPLETE_TODO,id,completedAt});
      }

    }catch(error) {
      console.log(error);
    }
  }
}

export function editTodoAction(id,text) {
  return async (dispatch) => {
    try {
      await request.patch(`/todos/${id}`, {text});
    }catch(error) {
      console.log(error);
    }
  }
}
