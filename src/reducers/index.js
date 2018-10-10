import { combineReducers } from 'redux';

import TasksReducer from './tasks.reducer';
import CurrentTaskReducer from './currentTask.reducer';
import PreviousTasks from './completedTasks.reducer';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  currentTask: CurrentTaskReducer,
  previousTasks: PreviousTasks
});

export default rootReducer;
