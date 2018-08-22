import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import formsOperations from "../../services/formsOperations";
import {CreateUserPage} from "../CreateUserPage";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import redirectOnPage from "../../services/redirectOnPage";
import showToastrMessage from "../../services/showToastrMessage";
import localStorageOperations from "../../services/localStorageOperations";
import isEqual from "lodash.isequal";
import LoadingSpinner from '../../components/LoadingSpinner';

export class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = formsOperations.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.loggedUser.error;

        if (nextProps.loggedUser.data && nextProps.loggedUser.data.username && !isEqual(this.props.loggedUser.data, nextProps.loggedUser.data)) {
            showToastrMessage.success('Successfully logged!');
            localStorageOperations.setItem('user', nextProps.loggedUser.data);
            redirectOnPage.path('/users');
        }
        error && this.handleError(error);
    }

    handleError(error) {
        if(error.response && error.response.status === 401) {
            showToastrMessage.error('Not found');
        } else if (error.response && error.response.status === 400) {
            showToastrMessage.error('Username and password required');
        } else {
            showToastrMessage.error(error);
        }
    }

    login(event) {
        event.preventDefault();
        this.props.actions.userLoginRequest(this.state);
    };

    render() {
        const {username, password} = this.state;
        const {loading} = this.props;

        return (
            <div className='login'>
                <h2>User login</h2>
                <form className='login--row'>
                    <div className='col-md-6'>
                        <label htmlFor='login-username'>Username</label>
                        <input onChange={this.handleChange} value={username} id='login-username' name='username' className='form-control' type="text"/>
                        <label htmlFor="login-password">Password</label>
                        <input onChange={this.handleChange} value={password} id='login-password' name='password' className='form-control' type="password"/>
                    </div>

                    <button onClick={this.login} className='login__send btn btn-outline-primary' type='submit'>Send</button>
                </form>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateUserPage.defaultProps = {
    loggedUser: {},
    loading: false
};

CreateUserPage.propTypes = {
    loggedUser: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    loggedUser: state.Users.loggedUser,
    loading: state.Users.loggedUser.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
