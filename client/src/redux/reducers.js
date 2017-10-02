import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import C from './constants';


const todos = (state = [], action) => {
  switch (action.type) {
    case C.ADD_TODO:
      return [...state, {text:action.text, id:action.id, completed:action.completed,completedAt:action.completedAt}];
    default:
      return state;
  }
}

const auth = (state=false,action) => {
  switch (action.type) {
    case C.AUTHENTICATED:
      return {...state, auth:true};
    case C.UNAUTHENTICATED:
      return {...state, auth:false};
    case C.AUTHENTICATION_ERROR:
      return {...state, error:action.payload}
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
        default:
          return state;
      }
    }
  }),
  todos,
  auth
});

export default rootReducer;
