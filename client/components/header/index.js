import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

import './index.scss';
import * as usersActionCreators from "../../actions/action_creators/users";
import classNames from 'classnames';
import AuthenticationService from '../../services/authenticationService';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setState({
            isAuthenticated: AuthenticationService.isAuthenticated()
        });
    }

    componentWillReceiveProps() {
        this.setState({
            isAuthenticated: AuthenticationService.isAuthenticated()
        });
    }

    logout() {
        this.props.actions.logout();
    }

    render() {
        const {isAuthenticated} = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <Link to='/login' className={classNames("navbar-brand", {'header--hide': isAuthenticated})}>Login</Link>
                    <span onClick={this.logout} className={classNames("navbar-brand", {'header--hide': !isAuthenticated})}>Logout</span>
                </nav>
            </div>
        );
    }
}

Header.propTypes = {
    authenticateStore: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    users: state.Users.users,
    user: state.User.user,
    createUser: state.CreateUser,
    groups: state.Groups.groups,
    group: state.Group.group,
    createGroup: state.CreateGroup,
    authenticateStore: state.Authenticate
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));