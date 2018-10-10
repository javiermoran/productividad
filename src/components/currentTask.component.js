import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Glyphicon } from 'react-bootstrap';

import prettySecondsEs from '../utils/prettySecondsEs';
import { 
  refreshCurrentTask, 
  updateCurrentTaskTime, 
  getTasks, 
  toggleCurrentTaskPlaying,
  setTaskAsComplete 
} from '../actions';

class CurrentTask extends Component {
  constructor(props) {
    super(props);

    this.interval = null;
  }

  componentDidMount() {
    this.props.refreshCurrentTask();

    const interval = localStorage.getItem('interval');
    clearInterval(interval);

    this.interval = setInterval(() => {
      if (!this.props.currentTask.paused) {
        this.props.updateCurrentTaskTime();
        if (this.props.currentTask.remaining <= 0) {
          this.props.getTasks();
        }
      }
    }, 1000);
    localStorage.setItem('interval', this.interval);
  }

  pauseClickHandler = () => {
    this.props.toggleCurrentTaskPlaying();
  }

  completeClickHandler = () => {
    this.props.setTaskAsComplete();
    this.props.getTasks();
    this.props.updateCurrentTaskTime();
  }

  render() {
    return (
        <div>
          <Badge>
            {prettySecondsEs(this.props.currentTask.remaining)}
          </Badge>
          <Button bsStyle="link" onClick={this.pauseClickHandler}>
            <Glyphicon
              title={!this.props.currentTask.paused ? 'Pausar tarea' : 'Continuar'}
              glyph={!this.props.currentTask.paused ? 'pause' : 'play'}
            />
          </Button>
          <Button bsStyle="link" onClick={this.completeClickHandler} title="Completar tarea">
            <Glyphicon glyph="ok" />
          </Button>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTask: state.currentTask
  };
}

const actions = { 
  refreshCurrentTask, 
  updateCurrentTaskTime, 
  getTasks, 
  toggleCurrentTaskPlaying, 
  setTaskAsComplete 
};

export default connect(mapStateToProps, actions)(CurrentTask);
