import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import C from './constants';


const todos = (state = [], action) => {
  switch (action.type) {
    case C.ADD_TODO:
      return {...state, text:action.text}
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form: formReducer,
  todos
});

export default rootReducer;
