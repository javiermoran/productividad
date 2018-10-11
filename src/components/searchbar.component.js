import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Checkbox } from 'react-bootstrap';

import { filterTasks, searchTermChanged } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      short: true,
      medium: true,
      long: true
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
        <FormGroup>
          <Checkbox 
            checked={this.state.short} 
            onChange={(e) => { this.setState({ short: e.target.checked }, this.searchParamsChangeHandler) }} 
            inline>Corta</Checkbox>
          <Checkbox 
            checked={this.state.medium} 
            onChange={(e) => { this.setState({ medium: e.target.checked }, this.searchParamsChangeHandler) }} 
            inline>Media</Checkbox>
          <Checkbox 
            checked={this.state.long} 
            onChange={(e) => { this.setState({ long: e.target.checked }, this.searchParamsChangeHandler) }} 
            inline>Larga</Checkbox>
        </FormGroup>
      </form>
    );
  }

  searchChangeHandler = (e) => {
    this.setState({ search: e.target.value }, this.searchParamsChangeHandler);
    
  }

  searchParamsChangeHandler = () => {
    const search = { 
      term: this.state.search,
      short: this.state.short,
      medium: this.state.medium,
      long: this.state.long
    };
    this.props.searchTermChanged(search);    
    this.props.filterTasks(search);
  }
}

function mapStateToProps(state) {
  return { search: state.searchTerm };
}

export default connect(mapStateToProps, { filterTasks, searchTermChanged })(SearchBar);
