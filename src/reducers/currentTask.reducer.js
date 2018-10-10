import { REFRESH_CURRENT } from '../actions'

export default function(state = {}, action) {
  const task = action.payload || {};
  if(!task.hasOwnProperty('paused')) {
    task.paused = false;
  }

  switch(action.type) {
    case REFRESH_CURRENT:       
      return task;

    default:
      return state;

  }
}
