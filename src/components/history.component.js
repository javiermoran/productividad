import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroup, Row, Col } from 'react-bootstrap';

import prettySecondsEs from '../utils/prettySecondsEs';
import { getCompletedTasks } from '../actions';

class History extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCompletedTasks();
  }

  renderList() {
    const items = this.props.completed.map((task) => {
      return (
          <ListGroupItem key={task.id}>
            <Row>
              <Col xs={12}>
                {task.description}
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <b>Completada: </b>
                {new Date(task.completed).toLocaleDateString()}
              </Col>
              <Col xs={4}>
                <b>Estimado: </b>
                {prettySecondsEs(task.time)}
              </Col>
              <Col xs={4}>
                <b>Duración: </b>
                {prettySecondsEs(task.time - task.remaining)}
              </Col>
            </Row>
          </ListGroupItem>
      );
    });

    return <ListGroup>{items}</ListGroup>
  }

  render() {
    return (
      <div className="container">
        <h1>Historial</h1>
        <Link to="/tareas">Tareas</Link>
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { completed: state.previousTasks };
}

export default connect(mapStateToProps, { getCompletedTasks })(History);
