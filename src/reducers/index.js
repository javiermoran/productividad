import { combineReducers } from 'redux';

import TasksReducer from './tasks.reducer';
import CurrentTaskReducer from './currentTask.reducer';
import PreviousTasks from './completedTasks.reducer';
import productivityDataReducer from './productivityData.reducer';
import SearchBarReducer from './searchbar.reducer';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  currentTask: CurrentTaskReducer,
  previousTasks: PreviousTasks,
  productivityData: productivityDataReducer,
  searchTerm: SearchBarReducer
});

export default rootReducer;
