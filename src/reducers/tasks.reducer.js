import { REFRESH_TASKS } from '../actions';

export default function tasksReducer(state = [], action) {  
  switch(action.type) {
    case REFRESH_TASKS:
      return action.payload;

    default:
      return state;
  }
}