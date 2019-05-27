import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions';

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _token: document.head.querySelector('meta[name="csrf-token"]').content
        };
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.logout(this.state);
    }

    render() {

        if (this.props.auth.id) {
            return <Redirect to={pathname} />;
        }
        return (
            {}
        );
    }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Logout);
