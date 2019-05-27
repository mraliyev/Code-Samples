import React, { Fragment } from 'react';
import 'moment-timezone';
import Moment from 'react-moment';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.interval = 60 * 1000;
    this.dateFormat = 'MMM D, hh:mm a';

    this.timezones = {
      EST: 'America/Detroit',
      PST: 'America/Los_Angeles',
      UTC: 'Europe/London',
      EET: 'Europe/Kiev',
    };

    this.state = {
      date: new Date(),
      hidden: true,
    };
  }

  componentDidMount = () => {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, this.interval);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  getCurrentTimeInTimezones = () => {
    return Object.entries(this.timezones).map(([zoneName, timezone]) => {
      return (
        <tr key={zoneName}>
          <td>{zoneName}</td>
          <td>
            <Moment tz={timezone} format={this.dateFormat}>
              {this.state.date.getTime()}
            </Moment>
          </td>
        </tr>
      );
    });
  };

  onButtonClick = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  render() {
    return (
      <Fragment>
        <a onClick={this.onButtonClick} className="w3-button w3-hover-none">
          Timezones
        </a>
        <div className={this.state.hidden ? 'w3-hide' : 'w3-show'}>
          <table className="timezones w3-table-all w3-white">
            <tbody className="w3-centered">
              {this.getCurrentTimeInTimezones()}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}
