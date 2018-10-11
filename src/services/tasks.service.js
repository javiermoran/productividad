import uuid from 'uuid/v4';

export default class TasksService {

  static getTasks() {
    this.getProductivity();
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

  static getFilteredTasks(search) {
    const tasks = this.getTasks();

    return tasks.filter((task) => {
      if(!search.short && task.time < 1800) {
        return false;
      }

      if(!search.medium && task.time >= 1800 && task.time < 3600) {
        return false;
      }

      if(!search.long && task.time >= 3600) {
        return false;
      }

      return task.description.toLowerCase().indexOf(search.term.toLowerCase()) !== -1;
    });
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
    tasks.unshift(newTask);
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
    tasks[index].remainingFinished = tasks[index].remaining;
    tasks[index].remaining = 0;
    tasks[index].status = 'completed';
    tasks[index].completed = Date.now();

    if(tasks[0]) {
      tasks[0].paused = false;
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static togglePauseTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex((task) => task.id == id);
    tasks[index].paused = !tasks[index].paused;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static moveTaskPosition(id, direction) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex((task) => task.id == id);
    const index2 = direction == 'up' ? index - 1 : index + 1;

    var b = JSON.parse(JSON.stringify(tasks[index]));
    tasks[index] = JSON.parse(JSON.stringify(tasks[index2]));
    tasks[index2] = b;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    return this.getTasks();
  }

  static getProductivity() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = tasks.filter(task => task.status == 'completed');
    
    const groups = completed.reduce((groups, item) => {
      let date = new Date(item.completed);
      date = date.setHours(0,0,0,0);

      if(!groups[date]) {
        groups[date] = [];
      }

      groups[date]++;
      
      return groups;
    }, {});

    const keys = Object.keys(groups);
    const data = keys.map((date) => ({ date, count: groups[date] }));
    
    if(data.length > 7) {
      return data.slice(Math.max(data.length - 7, 1));
    }

    return data;
  }

  static generateMockData() {
    const newTasks = [
      { id: uuid(), description: "Actividad corta 1", remaining: 3, status: "pending", time: 3},
      { id: uuid(), description: "Actividad corta 2", remaining: 5, status: "pending", time: 5},
      { id: uuid(), description: "Actividad corta 3", remaining: 100, status: "pending", time: 100},
      { id: uuid(), description: "Actividad mediana", remaining: 3000, status: "pending", time: 3000},
      { id: uuid(), description: "Actividad larga", remaining: 5400, status: "pending", time: 5400},
      { id: uuid(), description: "Actividad 6", remaining: 1800, status: "pending", time: 1800},
      { id: uuid(), description: "Actividad 7", remaining: 1800, status: "pending", time: 1800},
      { id: uuid(), description: "Actividad 8", remaining: 1800, status: "pending", time: 1800},
      { id: uuid(), description: "Actividad 15", remaining: 1800, status: "pending", time: 1800},
      { id: uuid(), description: "Actividad 16", remaining: 1800, status: "pending", time: 1800},
      { id: uuid(), completed: 1539133323000, description: "Actividad 1", remaining: 0, status: "completed", time: 1800, remainingFinished: 1600},
      { id: uuid(), completed: 1539133323000, description: "Actividad 2", remaining: 0, status: "completed", time: 1800, remainingFinished: 100},
      { id: uuid(), completed: 1538956800000, description: "Actividad 3", remaining: 0, status: "completed", time: 1800, remainingFinished: 600},
      { id: uuid(), completed: 1538956800000, description: "Actividad 4", remaining: 150, status: "completed", time: 1800, remainingFinished: 0},
      { id: uuid(), completed: 1539133323000, description: "Actividad 5", remaining: 1200, status: "completed", time: 1800, remainingFinished: 300},
      { id: uuid(), completed: 1538870400000, description: "Actividad 11", remaining: 1200, status: "completed", time: 1800, remainingFinished: 0},
      { id: uuid(), completed: 1538784000000, description: "Actividad 9", remaining: 1200, status: "completed", time: 1800, remainingFinished: 0},
      { id: uuid(), completed: 1539133323000, description: "Actividad 10", remaining: 1200, status: "completed", time: 1800, remainingFinished: 0},
      { id: uuid(), completed: 1538611200000, description: "Actividad 12", remaining: 1200, status: "completed", time: 1800, remainingFinished: 160},
      { id: uuid(), completed: 1538611200000, description: "Actividad 13", remaining: 1200, status: "completed", time: 1800, remainingFinished: 0},
      { id: uuid(), completed: 1538611200000, description: "Actividad 14", remaining: 1200, status: "completed", time: 1800, remainingFinished: 0},
    ];

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(...newTasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return this.getTasks();
  }

}
