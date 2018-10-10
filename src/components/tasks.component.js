import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem, Glyphicon, Row, Col } from 'react-bootstrap';

import prettySecondsEs from '../utils/prettySecondsEs';
import SearchBar from './searchbar.component';
import CurrentTask from './currentTask.component';
import { getTasks, deleteTask, setTaskAsComplete, toggleCurrentTaskPlaying } from '../actions';

class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTasks();
  }

  deleteClickHandler = (id) => {
    this.props.deleteTask(id);
  }

  editClickHandler = (id) => {
    this.props.history.push(`/tareas/${id}`);
  }

  completeClickHandler = () => {
    this.props.setTaskAsComplete();
    this.props.getTasks();
  }

  pauseClickHandler = () => {
    this.props.toggleCurrentTaskPlaying();
  }

  renderTime = (task) => {
    if(task.id === this.props.currentTask.id) {
      return <CurrentTask />
    } else {
      return <small>{prettySecondsEs(task.time)}</small>;
    }
  }

  renderList() {
    if(!this.props.tasks.length) {
      return <div>No se encontraron tareas</div>;
    }

    const list = this.props.tasks.map(task => {
      return (
        <ListGroupItem key={task.id}>
          <Row>
            <Col xs={10}>
              {task.description}
            </Col>
            <div className="tasks-right-btns">
              <Glyphicon glyph="pencil" onClick={() => { this.editClickHandler(task.id) }} />
              <Glyphicon glyph="trash" onClick={() => { this.deleteClickHandler(task.id) }} />
            </div>
          </Row>
          <Row>
            <Col xs={12}>{this.renderTime(task)}</Col>
          </Row>
        </ListGroupItem>
      );
    });

    return <ListGroup>{list}</ListGroup>;
  }

  render() {
    return (
      <div className="container">
        <h1>Tareas</h1>
        <Link to="/tareas/historial">
          <span>Historial</span>
        </Link>
        <Row>
          <Col xs={10} sm={10}>
            <SearchBar />
          </Col>
          <Col xs={2} sm={2}>
            <Link to="/tareas/new">
              <Button bsStyle="primary" block>
                <span className="hidden-xs">Crear tarea</span>
                <Glyphicon className="visible-xs" glyph="plus" />
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.renderList()}
          </Col>
        </Row>        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    currentTask: state.currentTask
  }
}

const actions = { getTasks, deleteTask, setTaskAsComplete, toggleCurrentTaskPlaying };
export default connect(mapStateToProps, actions)(Tasks);
