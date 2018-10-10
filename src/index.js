import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import reducers from './reducers';
import Tasks from './components/tasks.component';
import TasksForm from './components/taskForm.component';
import CurrentTask from './components/currentTask.component';
import History from './components/history.component';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const app = document.getElementById('app');

const Landing = () => <Redirect to="/tareas" />;

const App = () => {
  return (
    <main>
      <div className="page-header">
        <div className="container">
          <div className="text-right">
            <div className="panel-current-task">
              <CurrentTask />
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/tareas/historial" component={History} />
        <Route path="/tareas/new" component={TasksForm} />
        <Route path="/tareas/:id" component={TasksForm} />
        <Route path="/tareas" component={Tasks} />
        <Route path="/" component={Landing} />
      </Switch>
    </main>
  )
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , app);