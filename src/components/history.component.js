import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroup, Row, Col, Panel, Tabs, Tab } from 'react-bootstrap';

import prettySecondsEs from '../utils/prettySecondsEs';
import { getCompletedTasks } from '../actions';
import ProductivityChart from './productivityChart.component';

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
                <h4>{task.description}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <b>Completada: </b>
                <br />
                <small>
                  {new Date(task.completed).toLocaleDateString()}
                </small>
              </Col>
              <Col xs={4}>
                <b>Estimado: </b>
                <br />
                <small>
                  {prettySecondsEs(task.time)}
                </small>
              </Col>
              <Col xs={4}>
                <b>Duración: </b>
                <br />
                <small>
                  {prettySecondsEs(task.time - task.remainingFinished)}
                </small>
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

        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Gráfica de productividad">
            <ProductivityChart />
          </Tab>
          <Tab eventKey={2} title="Historial">
            <br />
            {this.renderList()}
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { completed: state.previousTasks };
}

export default connect(mapStateToProps, { getCompletedTasks })(History);
