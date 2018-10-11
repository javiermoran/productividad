import { GET_PRODUCTIVITY } from '../actions';

export default function productivityDataReducer(state = [], action) {
  switch(action.type) {
    case GET_PRODUCTIVITY:
      return action.payload;

    default:
      return state;
  }
}
