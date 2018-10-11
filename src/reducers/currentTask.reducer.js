import { REFRESH_CURRENT } from '../actions'

export default function(state = {}, action) {
  switch(action.type) {
    case REFRESH_CURRENT:       
      const task = action.payload || {};
      if(!task.hasOwnProperty('paused')) {
        task.paused = false;
      }
      return task;

    default:
      return state;

  }
}
