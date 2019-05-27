import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsList from './StatsList';
import { getStats } from '../../store/actions';

class Stats extends Component {
  constructor(props){
    super(props);
    this.timer = null;
    this.interval = 120 * 1000;
  }

  componentDidMount = () => {
    this.props.getStats();
    this.timer = setInterval(this.props.getStats, this.interval);
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }
  
  render() {
    return (
      <div className="w3-reponsive wrapper">
        <StatsList {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = ({stats}) => ({
    stats: stats.stats
});

export default connect(mapStateToProps, { getStats })(Stats);
