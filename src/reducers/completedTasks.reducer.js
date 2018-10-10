import { REFRESH_COMPLETED } from '../actions';

export default function(state = [], action) {
  switch(action.type) {
    case REFRESH_COMPLETED:
      return action.payload;

    default:
      return state;
  }
}