import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import './index.scss';
import * as usersActionCreators from '../../actions/action_creators/users';
import formsOperations from '../../services/formsOperations';
import LoadingSpinner from '../../components/LoadingSpinner';
import isEqual from "lodash.isequal";
import showToastrMessage from "../../services/showToastrMessage";
import redirectOnPage from "../../services/redirectOnPage";

export class CreateUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
        this.handleChange = formsOperations.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.createUser.error;

        error && showToastrMessage.error(error);

        if (!isEqual(this.props.createUser.data, nextProps.createUser.data)) {
            showToastrMessage.success();
            redirectOnPage.path('/users');
        }
    }

    createUser(event) {
        event.preventDefault();
        this.props.actions.createUserRequest(this.state)
    };

    render() {
        const {username, firstName, lastName, email, password} = this.state;
        const {loading} = this.props;

        return (
            <div className='create-user'>
                <h4>Create User</h4>
                <form className='create-user--row col-md-4'>
                    <div>
                        <label htmlFor='create-username'>username</label>
                        <input onChange={this.handleChange} value={username} name='username' id='create-username' className='form-control' type="text"/>
                        <label htmlFor='create-firstName'>firstName</label>
                        <input onChange={this.handleChange} value={firstName} name='firstName' id='create-firstName' className='form-control' type="text"/>
                        <label htmlFor='create-lastName'>lastName</label>
                        <input onChange={this.handleChange} value={lastName} name='lastName' id='create-lastName' className='form-control' type="text"/>
                        <label htmlFor='create-email'>email</label>
                        <input onChange={this.handleChange} value={email} name='email' id='create-email' className='form-control' type="text"/>
                        <label htmlFor='create-password'>password</label>
                        <input onChange={this.handleChange} value={password} name='password' id='create-password' className='form-control' type="password"/>
                    </div>

                    <button onClick={this.createUser} className='create-user__send btn btn-outline-primary' type='submit'>Send</button>
                </form>
                <LoadingSpinner loading={loading}/>
            </div>
        );
    }
}

CreateUserPage.defaultProps = {
    createUser: {},
    loading: false
};

CreateUserPage.propTypes = {
    createUser: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    createUser: state.Users.createdUser,
    loading: state.Users.createdUser.loading
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...usersActionCreators
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPage);
