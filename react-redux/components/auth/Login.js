import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: '',
      _token: document.head.querySelector('meta[name="csrf-token"]').content,
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount = () => {
    this.props.login();
  };

  render() {
    const {
      referrer: { pathname },
    } = this.props.location.state || { referrer: { pathname: '/' } };

    if (this.props.auth.id) {
      return <Redirect to={pathname} />;
    }
    const errors = this.props.auth.errors || [];
    return (
      <div className="responsive wrapper">
        ...
        ...
        ...
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { login }
)(Login);
