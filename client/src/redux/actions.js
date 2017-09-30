import C from './constants';

export const addTodo = text => {
  return {
    type: C.ADD_TODO,
    text
  }
}
