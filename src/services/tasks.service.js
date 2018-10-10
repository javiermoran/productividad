import uuid from 'uuid/v4';

export default class TasksService {

  static getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.filter((task) => task.status == 'pending');
  }

  static getCompletedTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.filter((task) => task.status == 'completed');
  }

  static getTask(id) {
    const tasks = this.getTasks();
    return tasks.filter((task) => task.id == id)[0] || null;
  }

  static getFilteredTasks(searchTerm) {    
    const tasks = this.getTasks();
    return tasks.filter((task) => 
      task.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }

  static deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex((task) => task.id === id);
    if(index !== -1) {
      tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return this.getTasks();
  }

  static createTask(task) {
    const newTask = {
      id: uuid(),
      description: task.description,
      time: task.time,
      remaining: task.time,
      status: 'pending'
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return this.getTasks();
  }

  static updateTask(id, task) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.findIndex((t) => t.id == id);
    tasks[index].description = task.description;
    tasks[index].time = task.time;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return this.getTasks();
  }

  static updateCurrentTime() {
    const tasks = this.getTasks();
    if(tasks.length) {
      tasks[0].remaining--;

      if(tasks[0].remaining <= 0) {
        this.setTaskComplete(tasks[0].id);
      } else {
        const all = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = all.findIndex((t) => t.id == tasks[0].id);
        all[index].remaining = tasks[0].remaining;
        localStorage.setItem('tasks', JSON.stringify(all));
      }
    }
  }

  static setTaskComplete(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex((task) => task.id == id);
    tasks[index].remaining = 0;
    tasks[index].status = 'completed';
    tasks[index].completed = Date.now();

    if(tasks[1]) {
      tasks[1].paused = false;
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static togglePauseTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex((task) => task.id == id);
    tasks[index].paused = !tasks[index].paused;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
