import TasksService from '../services/tasks.service';

export const REFRESH_TASKS = 'REFRESH_TASKS';
export const GET_TASKS = 'GET_TASKS';
export const FILTER_TASKS = 'FILTER_TASKS';
export const REFRESH_CURRENT = 'REFRESH_CURRENT_TASK';
export const REFRESH_COMPLETED = 'REFRESH_COMPLETED';

export function getTasks() {
  const payload = TasksService.getTasks();  
  return { type: REFRESH_TASKS, payload }
}

export function filterTasks(searchTerm) {
  const payload = TasksService.getFilteredTasks(searchTerm);
  return { type: REFRESH_TASKS, payload }
}

export function deleteTask(id) {
  const payload = TasksService.deleteTask(id);
  return { type: REFRESH_TASKS, payload }
}

export function createTask(task) {
  const payload = TasksService.createTask(task);
  return { type: REFRESH_TASKS, payload }
}

export function updateTask(id, task) {
  const payload = TasksService.updateTask(id, task);
  return { type: REFRESH_TASKS, payload }
}

export function refreshCurrentTask() {
  const payload = TasksService.getTasks()[0];
  return { type: REFRESH_CURRENT, payload}
}

export function updateCurrentTaskTime() {
  TasksService.updateCurrentTime();
  const payload = TasksService.getTasks()[0];
  return { type: REFRESH_CURRENT, payload}
}

export function setTaskAsComplete() {
  const task = TasksService.getTasks()[0];
  const updatedTask = TasksService.setTaskComplete(task.id);
  return { type: REFRESH_CURRENT, payload: updatedTask };
}

export function getCompletedTasks() {
  const payload = TasksService.getCompletedTasks();
  return { type: REFRESH_COMPLETED, payload };
}

export function toggleCurrentTaskPlaying() {
  const task = TasksService.getTasks()[0];
  TasksService.togglePauseTask(task.id);
  const updatedTask = TasksService.getTasks()[0];
  return { type: REFRESH_CURRENT, payload: updatedTask };
}
