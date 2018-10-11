import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import { getProductivityData } from '../actions';

class ProductivityChart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProductivityData();
  }

  renderChart = () => {
    const data = this.props.data;
    const tickValues = data.map((item) => item.date);
    const tickFormat = data.map((item) => {
      const date = (item.date / 1000);
      return moment.unix(date).format('DD/MM');
    });

    return (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis tickValues={tickValues} tickFormat={tickFormat} />
        <VictoryAxis dependentAxis tickFormat={(x) => x}/>
        <VictoryBar x="date" y="count" data={this.props.data} />
      </VictoryChart>
    )
  }

  render() {
    const style = { height: '500px' }
    return (
      <div style={style}>
        <h3 className="text-center">Tareas completadas recientemente</h3>
        {this.renderChart()}
      </div>
    );
  }
}

function mapPropsToState(state) {
  return { data: state.productivityData };
}

const actions = { getProductivityData }
export default connect(mapPropsToState, actions)(ProductivityChart);
