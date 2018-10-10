import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl } from 'react-bootstrap';

import { filterTasks } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  render() {
    return (
      <form>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.search}
            placeholder="Filtrar tareas"
            onChange={this.searchChangeHandler}
          />
        </FormGroup>
      </form>
    );
  }

  searchChangeHandler = (e) => {
    this.setState({ search: e.target.value });
    this.props.filterTasks(e.target.value);
  }
}

export default connect(null, { filterTasks })(SearchBar);
