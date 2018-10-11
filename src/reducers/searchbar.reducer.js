import { REFRESH_TASKS, SEARCH_TERM_CHANGED } from '../actions';

export default function searchbarReducer(state = null, action) {
  switch(action.type) {
    case SEARCH_TERM_CHANGED:
      return action.payload;

    default:
      if(state === null) {
        return { 
          term: '', 
          short: true, 
          medium: true, 
          long: true 
        };
      } else {
        return state; 
      }
  }
}