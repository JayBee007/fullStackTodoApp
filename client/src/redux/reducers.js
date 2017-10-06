import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import C from './constants';

const todos = (state = [], action) => {
  switch (action.type) {
    case C.ADD_TODO:
      return [...state, {text:action.text, _id:action.id, completed:action.completed,completedAt:action.completedAt}];
    case C.FETCH_TODO:
      return [...action.todos];
    case C.DELETE_TODO:
      return state.filter((todo) => {
        return todo._id !== action.id;
      });
    case C.COMPLETE_TODO:
      return state.map((todo) => {
        return (todo._id === action.id)
          ? {...todo, completed: !todo.completed, completedAt:action.completedAt}
          :todo
      })
    case C.REMOVE_TODOS:
      return [];
    default:
      return state;
  }
}

const user = (state="",action) => {
  const {email,id} = action;
  switch(action.type) {
    case C.ADD_USER_DATA:
      return {email,id}
    case C.REMOVE_USER_DATA:
      return "";
    default:
      return state;
  }
}

const auth = (state=false,action) => {
  switch (action.type) {
    case C.AUTHENTICATED:
      return {...state, auth:true, error:""};
    case C.UNAUTHENTICATED:
      return {...state, auth:false, error:""};
    case C.AUTHENTICATION_ERROR:
      return {...state,auth:false,error:action.payload}
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form: formReducer.plugin({
    signupForm:(state, action) => {
      switch(action.type) {
        case C.AUTHENTICATED:
          return undefined;
        default:
          return state;
      }
    },
    loginForm: (state,action) => {
      switch(action.type) {
        case C.AUTHENTICATED:
          return undefined;
        default:
          return state;
      }
    },
    inputForm: (state,action) => {
      switch(action.type) {
        case C.ADD_TODO:
          return undefined;
        default:
          return state;
      }
    }
  }),
  todos,
  user,
  auth
});

export default rootReducer;
