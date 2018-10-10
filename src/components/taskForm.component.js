import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

import TasksService from '../services/tasks.service';
import { createTask, updateTask } from '../actions';

class TaskForm extends Component {
  constructor(props) {
    super(props);

    const id = props.match.params.id;
    const task = id ? TasksService.getTask(id) : null;
    this.state = this.initState(task);
  }

  initState = (task) => {
    const options = [1800, 3600, 5400];
    const title = task ? 'Editar tarea' : 'Nueva tarea';
    const description = task ? task.description : '';

    let selected = task ? task.time : 1800;
    const hours = task ? Math.floor(selected / 3600) : 0;
    const minutes = task ? Math.floor ( (selected % 3600) / 60 ) : 30;

    if(!options.includes(selected)) { 
      selected = 'custom';
    }

    return {
      title,
      selected,
      description,
      hours,
      minutes
    }
  }

  cancel = () => {
    this.props.history.push('/tareas');
  }

  durationChangeHandler = (e) => {
    const selected = e.target.value;
    if(selected != 'custom') {
      const hours = Math.floor(selected / 3600);
      const minutes = (selected % 3600) / 60;
      this.setState({ selected, hours, minutes });
    } else {
      this.setState({ selected, hours: 1, minutes: 30 });
    }
  }

  descriptionChangeHandler = (e) => {
    this.setState({ description: e.target.value });
  }

  guardarClickHandler = () => {
    const task = {
      description: this.state.description,
      time: (this.state.hours * 3600) + (this.state.minutes * 60)
    }

    if(this.props.match.params.id) {
      this.props.updateTask(this.props.match.params.id, task);
    } else {
      this.props.createTask(task);
    }

    this.props.history.push('/tasks');
  }

  validateForm = () => {
    if(!this.state.description) {
      return false;
    }

    const time = (this.state.hours * 3600) + (this.state.minutes * 60);
    if((time / 3600) > 2) {
      return false;
    } 

    return true;
  }

  render () {
    return (
      <div className="container">
        <h1>{this.state.title}</h1>
        <form onSubmit={this.guardarClickHandler}>
          <FormGroup>
            <ControlLabel>Descripción</ControlLabel>
            <FormControl 
              value={this.state.description}
              onChange={this.descriptionChangeHandler}
              componentClass="textarea">
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Duración</ControlLabel>
            <FormControl 
              componentClass="select" 
              placeholder="Duración"
              onChange={this.durationChangeHandler}
              value={this.state.selected}
            >
              <option value="1800">Corta</option>
              <option value="3600">Media</option>
              <option value="5400">Larga</option>
              <option value="custom">Otra</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col sm={6}>
                <ControlLabel>Horas</ControlLabel>
                <FormControl 
                  disabled={this.state.selected != 'custom'}
                  type="number" 
                  placeholder="Horas" 
                  value={this.state.hours}
                  onChange={(e) => this.setState({hours: e.target.value})}
                   />
              </Col>
              <Col sm={6}>
                <ControlLabel>Minutos</ControlLabel>
                <FormControl 
                  disabled={this.state.selected != 'custom'}
                  type="number" 
                  placeholder="Minutos" 
                  value={this.state.minutes} 
                  onChange={(e) => this.setState({minutes: e.target.value})}
                />
              </Col>
            </Row>
          </FormGroup>
          <ButtonToolbar>
            <Button onClick={this.cancel}>Cancelar</Button>
            <Button bsStyle="primary" type="submit" disabled={!this.validateForm()}>
              Guardar
            </Button>
          </ButtonToolbar>
        </form>
      </div>
    )
  }
}

export default connect(null, { createTask, updateTask })(TaskForm);
